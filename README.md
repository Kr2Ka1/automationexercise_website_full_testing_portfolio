## **Automation Exercise - Full Website Testing**

### **Project Description**  
This repository contains a comprehensive suite of automated tests for the [Automation Exercise](https://automationexercise.com/) website. The tests cover end-to-end scenarios, ensuring that key functionalities work as expected. Covered areas include:  
- User Registration & Login  
- Product Search & Filtering  
- Shopping Cart & Checkout Process  
- Contact Form Submission  
- UI Element Visibility & Interactions  

### **Technologies Used**  
- **Playwright** (for browser automation)  
- **JavaScript/TypeScript**  
- **GitHub Actions** (for CI/CD integration)  

---

## **Getting Started**  

### **1. Clone the Repository**  
```sh
git clone https://github.com/Kr2Ka1/automationexercise_website_full_testing_portfolio.git
cd automationexercise_website_full_testing_portfolio
```

### **2. Install Dependencies**  
Ensure you have **Node.js (22.x)** installed, then run:  
```sh
npm install
```

### **3. Install Playwright Browsers**  
Before running tests, install the required browsers:  
```sh
npx playwright install
```

### **4. Run Tests**  
To execute all tests:  
```sh
npx playwright test
```

Run a specific test file:  
```sh
npx playwright test tests/example.spec.js
```

Run tests in headed mode (to see browser interactions):  
```sh
npx playwright test --headed
```

Run tests in debug mode:  
```sh
npx playwright test --debug
```

### **5. Generate and View Test Reports**  
Run tests and generate an HTML report:  
```sh
npx playwright test --reporter=html
```
View the report:  
```sh
npx playwright show-report
```

---

## **Continuous Integration (CI) with GitHub Actions**  
This repository includes a **GitHub Actions** workflow for running tests automatically on push and pull requests.  
