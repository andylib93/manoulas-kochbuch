import { OptionValue } from "./interfaces";

export const fillSelect = (values: OptionValue[]): string => {
    let list: string = "";
    values.forEach(valuePair => list += `<option value="${valuePair.value}">${valuePair.fill}</option>`);
    return list;
}
