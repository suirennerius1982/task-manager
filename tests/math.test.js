const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
    /* if (total !== 13) {
        throw new Error(`The total value calculate is incorrectly. The value should be 13 and recibed ${total}`)
    } */
})

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

test('Should convert 32 F to 0 C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
})

test('Should calculate total with default tip', () => {
    expect(calculateTip(10)).toBe(12.5)
})

//Example testing async code with done
test('Async test', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)
})

//Example with promise
test('Shuld add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(5).toBe(sum)
        done()
    })
})

//Example asyn with asyn/await
test('Should add two numbers async/await', async () => {
    const sum = await add(12, 20)
    expect(32).toBe(sum)
})