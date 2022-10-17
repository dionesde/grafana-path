import {DataFrame} from "@grafana/data";
import _ from "lodash";
export type DataEntry = [number, number,string, string, string, string, string, string];

export interface Point {
    id?: string
    lat: number;
    lng: number;
    color: string,
    label: string,
    day: string,
    popup?: string,
    from: Point[],
    to?: Point[],
    direction: string
}

export function seriesToEntries(series: DataFrame[]): Point[] {
    // TODO: how to make this function generic?
    let entries: DataEntry[] = [];
    for (const [idx, frame] of series.entries()) {
        entries = entries.concat(dataFrameToEntriesUnsorted(frame, idx));
    }
    //entries.sort((a, b) => a[2] - b[2]);
    return formatdata(entries);
}
function formatdata(data: DataEntry[]): Point[]{
    const output: Point[] = [];

    function isArray(id: string, day: string): boolean{
        for(let j=0; j < output.length; j++){
            if(id === output[j].id && day === output[j].day){
                return true;
            }
        }
        return false;
    }
    function getEl(output: Point[], elemnt: Point): Point[]{
        const from = [] as Point[];
        for(let j=0; j < output.length; j++){
            if(output[j].direction === 'origin' && elemnt.day === output[j].day && elemnt.id !== output[j].id){
                from.push(output[j]);
            }
        }
        return from;
    }

//create list
    for(let i = 0; i < data.length; i++){
        if(!isArray(data[i][5], data[i][4])){
            if(isNaN(data[i][0]) || isNaN(data[i][1])){
                continue;
            }
            output.push({
                lat: data[i][0],
                lng: data[i][1],
                color: data[i][2],
                label: data[i][3],
                day: data[i][4],
                id: data[i][5],
                direction: data[i][6],
                popup: data[i][7],
                from: [] as Point[]
            }as Point);
        }
    }
    //create path
    for(let i = 0; i < output.length; i++){
        output[i].from = getEl(output, output[i]);
    }
    return output;
}
export function dataFrameToEntriesUnsorted(frame: DataFrame, idx?: number): DataEntry[] {
    let fields: any = {};
    ['latitude','longitude','color', 'label','day', 'id', 'from','description'].forEach((item) => (fields[item] = null));
    for (const field of frame.fields) {
        if (fields.hasOwnProperty(field.name)) {
            fields[field.name] = field.values.toArray();
        } else {
            fields[field.name] = '';
      }
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
        fields.label.map((v: string) => v),
        fields.day.map((v: string) => v),
        fields.id.map((v: string) => v),
        fields.from.map((v: string) => v),
        fields.description.map((v: string) => v)
    ) as DataEntry[];
    return entries;
}
