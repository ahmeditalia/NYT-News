import { dateFormat } from "./utils"

describe("Util service",()=>{
    it("dateFormat: should format the date to Saturday, September 17, 2016", ()=>{
        const published_date = "2022-07-09T11:00:09-04:00";
        const date = dateFormat(published_date);
        expect(date).toBe("Saturday, July 9, 2022");

    })
})