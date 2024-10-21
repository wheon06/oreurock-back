export default function parseJsonArray(jsonArray: string[]): any[] {
  return jsonArray.map((jsonString) => JSON.parse(jsonString));
}
