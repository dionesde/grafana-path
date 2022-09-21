import {DataFrame} from "@grafana/data";
import _ from "lodash";
export type DataEntry = [number, number,string];

export interface RoutePoint {
    lat: number;
    lon: number;
    region: string;
    hops: Array<{
        nth: number;
        ip: string;
        label: string;
        rtt: number;
        loss: number;
    }>;
}

export function seriesToEntries(series: DataFrame[]): DataEntry[] {
    // TODO: how to make this function generic?
    let entries: DataEntry[] = [];
    for (const [idx, frame] of series.entries()) {
        entries = entries.concat(dataFrameToEntriesUnsorted(frame, idx));
    }
    //entries.sort((a, b) => a[2] - b[2]);
    return entries;
}
export function dataFrameToEntriesUnsorted(frame: DataFrame, idx?: number): DataEntry[] {
    // TODO: full iterator
    let fields: any = {};
    ['latitude','longitude','color', 'label'].forEach((item) => (fields[item] = null));
    for (const field of frame.fields) {
        if (fields.hasOwnProperty(field.name)) {
            fields[field.name] = field.values.toArray();
        } /* else {
        console.log('Ignoring field: ' + field.name);
      } */
    }
    if (Object.values(fields).includes(null)) {
        const missingFields = Object.entries(fields)
            .filter(([_key, value]) => value === null)
            .map(([key, _value]) => key);
        let message;
        const seriesName = typeof idx === 'number' ? ` ${idx}` : '';
        if (missingFields.length === 6) {
            if (frame.fields.map((field) => field.name).includes('Time')) {
                message = 'All fields are missing. Is the data formatted as table when querying InfluxDB?';
            } else {
                message = `All expected fields are missing from the query${seriesName}.`;
            }
        } else {
            message = `The query${seriesName} is missing field(s): ${missingFields.join(', ')}`;
        }
        throw new Error(message);
    }

    let entries = _.zip(
        fields.latitude.map((v: string) => parseFloat(v)),
        fields.longitude.map((v: string) => parseFloat(v)),
        fields.color.map((v: string) => v),
    ) as DataEntry[];
    return entries;
}
