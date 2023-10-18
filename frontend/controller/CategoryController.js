class CategoryController {
    constructor(apiEndPoint, authToken) {
        this.apiEndPoint = apiEndPoint
        this.authToken = authToken
    }

    async getCategory() {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${this.authToken}`);
    
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            const response = await fetch(`${this.apiEndPoint}`, requestOptions);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
            }
    
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetch category', error);
            throw error
        }
    }
}

module.exports = CategoryController;