import {DataFrame} from "@grafana/data";

export interface Point {
    id: string
    lat: number;
    lng: number;
    color: string,
    label: string,
    day: string
}

export function seriesToEntries(series: DataFrame[]): Point[] {
    // TODO: how to make this function generic?
    let entries: Point[] = [];
    for (const [idx, frame] of series.entries()) {
        entries = entries.concat(dataFrameToEntriesUnsorted(frame, idx));
    }
    //entries.sort((a, b) => a[2] - b[2]);
    return entries;
}
export function dataFrameToEntriesUnsorted(frame: DataFrame, idx?: number): Point {
    // TODO: full iterator
    let fields: any = {};
    ['latitude','longitude','color', 'label','day'].forEach((item) => (fields[item] = null));
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

    return fields as Point;
}
