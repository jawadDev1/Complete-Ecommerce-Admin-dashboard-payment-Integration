class ApiFeatures {
    constructor(findData, queryStr) {
        this.query = findData;
        this.queryStr = queryStr;
    }

    searchAndFilter(){
        let queryCopy = {...this.queryStr};   
        
        // Filter by category and price
        if(this.queryStr?.category){
            let removeFields = ['keyword', "page", 'limit'];
            removeFields.forEach( key => delete queryCopy[key]);
            
            // add $ sign before lt, gt, etc for searching in monogdb
            let queryStr = JSON.stringify(queryCopy);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
            
            this.query = this.query.find(JSON.parse(queryStr));
            
            return this;
        }
        
        // Search
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        let removeFields = ['keyword', "page", 'limit', 'category'];
        removeFields.forEach( key => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
        
        queryStr = JSON.parse(queryStr);
        
        this.query = this.query.find({...keyword, ...queryStr});
        console.log(this.query)
        return this
    }

    pagination(resultPerPage){
         let currentPage = Number(this.queryStr.page) || 1;
         let skip = resultPerPage * (currentPage - 1);

         this.query = this.query.limit(resultPerPage).skip(skip).sort({createdAt: -1})
         return this;
    }
}

module.exports = ApiFeatures;