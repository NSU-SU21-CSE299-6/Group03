class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword ? {

      name: {
        $regex: this.queryStr.keyword,
        $options: 'i'
      }

    } : {}

    this.query = this.query.find({ ...keyword });
    return this;

  }

  filter(){

    const queryCopy = { ...this.queryStr };


    // Removing fields from the query 
    const removeFields = ['keyword']
    removeFields.forEach(el => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);
    return this;


  }

}

module.exports = APIFeatures