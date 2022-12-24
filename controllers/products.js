const express = require('express');

const Products = require('../db/models')

const getProducts = async(req,res)=>{
    
    const {company,name,featured,sort,select} = req.query;
    const queryObject = {};
    /* --------------FILTRATION--------------*/
    
    if(company){
        queryObject.company = company;   
    }
    if(featured){
        queryObject.featured = featured;   
    }
    if(name){
        queryObject.name = {$regex: name, $options:"i"};
    }
    /* --------------SORTING--------------*/
    let apiData = Products.find(queryObject);
    if(sort){
        let sortFix = sort.split(",").join(" ");;
        apiData = await apiData.sort(sortFix);
    }
    /* --------------SELECTION--------------*/
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = await apiData.select(selectFix);
    }
    /* --------------PAGINATION--------------*/
    // let page = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 5;
    // let skip = (page-1) * limit;

    // apiData =  apiData.skip(skip).limit(limit);
    const products = await apiData;
    res.status(200).json({products, nbHits:apiData.length}); 
}
    

const getProductsTesting = async(req,res)=>{
    const myData = await Products.find(req.query);    
    res.status(200).json({myData});
}

module.exports = {getProducts,getProductsTesting};