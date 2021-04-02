import { ProductBase, ProductCasesResponse } from './ProductBase'

export class Product1 extends ProductBase<ProductCasesResponse> {
    constructor() {
        super('product1', 'output/producto1/Covid-19.csv')
    }

    process() {
        if(!this.content) {
            return null
        }

        let lines = this.content.split('\n')

        if(!lines || lines.length === 0) {
            return null
        }

        const header = lines.shift()?.split(',')

        header?.pop()

        if(!header) {
            return null
        }

        const result: ProductCasesResponse = {}

        result[0] = {
            locationName: 'Chile',
            currentCases: 0,
            historicalCases: null
        }

        lines.forEach(line => {
            if(!line) {
                return
            }

            const fields = line.split(',')

            fields.pop()

            const locationCode: number = parseInt(fields[3])
            const locationName: string = fields[2]
            const currentCases: number = parseInt(fields[fields.length - 1])
 
            if(isNaN(locationCode)) {
                return
            }

            if(!locationName.trim()) {
                return
            }

            if(isNaN(currentCases)) {
                return
            }
            
            result[locationCode] = {
                locationName,
                currentCases,
                historicalCases: null
            }

            result[0] = {
                ...result[0],
                currentCases: result[0].currentCases + currentCases
            }
        })

        return result
    }
}