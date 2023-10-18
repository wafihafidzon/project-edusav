class ProductController {
    constructor(apiEndPoint, authToken) {
        this.apiEndPoint = apiEndPoint
        this.authToken = authToken
    }

    async createProduct(productData) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${this.authToken}`);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: productData,
                redirect: 'follow'
            };

            const response = await fetch(`${this.apiEndPoint}`, requestOptions);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async getProducts() {
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
            console.error('Error fetching products:', error);
            throw error;
        }
    }    

    async getProductsById(productId) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${this.authToken}`);
    
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            const response = await fetch(`${this.apiEndPoint}${productId}`, requestOptions);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
            }
    
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }    

    async updateProduct(productId, updatedData) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${this.authToken}`);
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: updatedData,
                redirect: 'follow'
            };
    
            const response = await fetch(`${this.apiEndPoint}${productId}`, requestOptions);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} - ${errorData.message}`);
            }
    
            return await response.json();
        } catch (error) {
            console.error(`Error updating product ${productId}:`, error);
            throw error;
        }
    }
    

    async deleteProduct(productId) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${this.authToken}`);

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
            };

            const response = await fetch(`${this.apiEndPoint}${productId}`, requestOptions);
            return await response.json();
        } catch (error) {
            console.error(`Error deleting product ${productId}:`, error);
            throw error;
        }
    }
}

module.exports = ProductController;