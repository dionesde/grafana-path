import {DataFrame} from "@grafana/data";
import _ from "lodash";
export type DataEntry = [number, number,string, string, string, string, string];

export interface Point {
    id?: string
    lat: number;
    lng: number;
    color: string,
    label: string,
    day: string
    from: Point[],
    to?: Point[]
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
    function getEl(id: string, day: string): Point{
        for(let j=0; j < output.length; j++){
            if(id === output[j].id ){
                return output[j];
            }
        }
        return output[0];
    }

//create list
    for(let i = 0; i < data.length; i++){
        if(!isArray(data[i][5], data[i][4])){
            output.push({
                lat: data[i][0],
                lng: data[i][1],
                color: data[i][2],
                label: data[i][3],
                day: data[i][4],
                id: data[i][5],
                from: []
            }as Point);
        }
    }
    //create path
    for(let i = 0; i < data.length; i++){
        const elemnt = getEl(data[i][5], data[i][4]);
        elemnt?.from.push(getEl(data[i][6],data[i][4]));
    }
    return output;
}
export function dataFrameToEntriesUnsorted(frame: DataFrame, idx?: number): DataEntry[] {
    let fields: any = {};
    ['latitude','longitude','color', 'label','day', 'id', 'from'].forEach((item) => (fields[item] = null));
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
        fields.label.map((v: string) => v),
        fields.day.map((v: string) => v),
        fields.id.map((v: string) => v),
        fields.from.map((v: string) => v)
    ) as DataEntry[];
    return entries;
}
