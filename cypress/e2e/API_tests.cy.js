function responseBodyFunction(response) {
    try {
        return JSON.parse(response.body);
    } catch (e) {
        return response.body; // Jei nepavyksta konvertuoti, išlaikome kaip tekstą
    }
}
describe('1: Get All Products List', () => {
    it('should return status code 200 and respond within 2000ms and not be empty', () => {
        cy.request('GET', 'https://automationexercise.com/api/productsList').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('products').that.is.an('array').and.is.not.empty;
            const products = responseBody.products;
            // Tikriname, ar ID yra unikalūs
            const ids = products.map(product => product.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).to.eql(ids.length);
            // Tikriname, ar bent vienas produktas turi būtinas savybes
            const Product = products.find(product => product.id && product.name && product.price);
            expect(Product).to.have.property('id');
            expect(Product).to.have.property('name');
            expect(Product).to.have.property('price');
        });
    });
});


describe('2: POST To All Products List', () => {
    it('should return status wrong method', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/productsList',
            failOnStatusCode: false // Leisti testui tęsti, net jei gaunama klaida (405)
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 405);
            expect(responseBody).to.have.property('message', 'This request method is not supported.');
        });
    });
});
describe('3: Get All Brands List', () => {
    it('should return all brands', () => {
        cy.request('GET', 'https://automationexercise.com/api/brandsList').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('brands').that.is.an('array').and.is.not.empty;
            const brands = responseBody.brands;
            brands.forEach((brand) => {
                expect(brand).to.have.property('id');
                expect(brand).to.have.property('brand');
            });
        });
    });
});
describe('4: PUT To All Brands List', () => {
    it('should return status wrong method', () => {
        cy.request('PUT', 'https://automationexercise.com/api/brandsList').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 405);
            expect(responseBody).to.have.property('message', 'This request method is not supported.');
        });
    });
});

describe('5: POST To Search Product', () => {
    it('should return searched products list', () => {
        const searchProduct = 'top';
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct', form: true,
            body: { search_product: 'top' },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            let responseBody;
            if (typeof response.body === 'string') { responseBody = JSON.parse(response.body); } else { responseBody = response.body; }
            expect(responseBody).to.be.not.empty;
            expect(responseBody).to.have.property('responseCode', 200);
            const products = responseBody.products;
            products.forEach((product) => {
                expect(product).to.have.property('id');
                expect(product).to.have.property('name');
            });
        });
    });
});

describe('6: POST To Search Product without search_product parameter', () => {
    it('should return status 400 earch_product parameter is missing', () => {
        cy.request('POST', 'https://automationexercise.com/api/searchProduct').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 400);
            expect(responseBody).to.have.property('message', 'Bad request, search_product parameter is missing in POST request.');
        });
    });
});

describe('7: POST To Verify Login with valid details', () => {
    it('should return User exists!', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin', form: true,
            body: {
                email: 'Brokolis@testas.test.ts',
                password: 'testas'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody).to.have.property('message', 'User exists!');
        });
    });
});

describe('8: POST To Verify Login without email parameter', () => {
    it('should return status 400, email or password parameter is missing', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin', form: true,
            body: {
                password: 'testas'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 400);
            expect(responseBody).to.have.property('message', 'Bad request, email or password parameter is missing in POST request.');
        });
    });
});

describe('9: DELETE To Verify Login', () => {
    it('should return status wrong method', () => {
        cy.request('DELETE', 'https://automationexercise.com/api/verifyLogin').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 405);
            expect(responseBody).to.have.property('message', 'This request method is not supported.');
        });
    });
});

describe('10: POST To Verify Login with invalid details', () => {
    it('should return User not found!', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin', form: true,
            body: {
                email: 'neteisigas@testas.ly',
                password: 'neteisigas'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 404);
            expect(responseBody).to.have.property('message', 'User not found!');
        });
    });
});

describe('11: POST To Create/Register User Account', () => {
    it('should return User created!', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount', form: true,
            body: {
                name: 'Test',
                email: 'email@test.test.it',
                password: 'password11',
                title: 'Mrs',
                birth_date: '30',
                birth_month: '12',
                birth_year: '1991',
                firstname: 'tester',
                lastname: 'testerTester',
                company: 'tester',
                address1: 'test 11 test',
                address2: 'test 12 test',
                country: 'test',
                zipcode: '12589',
                state: 'test',
                city: 'test',
                mobile_number: '0124521569'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 201);
            expect(responseBody).to.have.property('message', 'User created!');
        });
    });
});

describe('13: PUT METHOD To Update User Account', () => {
    it('should return User updated!', () => {
        cy.request({
            method: 'PUT',
            url: 'https://automationexercise.com/api/updateAccount', form: true,
            body: {
                name: 'TestUpdate',
                email: 'email@test.test.it',
                password: 'password11',
                title: 'Mrs',
                birth_date: '50',
                birth_month: '12',
                birth_year: '1964',
                firstname: 'tester',
                lastname: 'testerTester',
                company: 'tester',
                address1: 'test 15 test',
                address2: 'test 12 test',
                country: 'test',
                zipcode: '12589',
                state: 'test',
                city: 'test',
                mobile_number: '0124521569'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody).to.have.property('message', 'User updated!');
        });
    });
});

describe('12: DELETE METHOD To Delete User Account', () => {
    it('should return Account deleted!', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/deleteAccount', form: true,
            body: {
                email: 'email@test.test.it',
                password: 'password11'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody).to.have.property('message', 'Account deleted!');
        });
    });
});

describe('14: GET user account detail by email', () => {
    it('should return User Detail', () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/getUserDetailByEmail',
            qs: {
                email: 'test@test.com'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2000);
            const responseBody = responseBodyFunction(response);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody).to.be.not.empty;
            const user = responseBody.user;
            expect(user).to.have.property('id');
            expect(user).to.have.property('name');
            expect(user).to.have.property('email');
        });
    });
})


