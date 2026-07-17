const express = require('express');
const { ResumeScore,interviewPrepHelp } = require('../services/AI.services');

const matchResumeScore =  async (req, res) => {
    try {
        const { jobDescription, resumeText } = req.body;
        if(!jobDescription || !resumeText) {
            return res.status(400).json({
                message: "Please provide all details"
            })
        }

        const response =await ResumeScore(resumeText, jobDescription);

        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
       
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}


const interviewPrep =async(req,res)=>{
    try {
        const {companyName , roleTitle} =req.body;
        if(!companyName || !roleTitle) {
            return res.status(400).json({
                message: "Please provide all details"
            });
        }
        const response = await interviewPrepHelp(companyName,roleTitle);

        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
       
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = { matchResumeScore,interviewPrep };