const express = require('express');
const prisma = require('../../prisma/client');
const { Prisma } = require('@prisma/client');



const createApplication = async (req, res) => {
    try {

        const {
            companyName,
            roleTitle,
            status,
            dateApplied,
            jobLink,
            notes

        } = req.body;


        if (!companyName || !roleTitle || !dateApplied) {
            return res.status(400).json({
                message: "Please fill all required field"
            })
        }

        const userId = req.userId;

        const application = await prisma.application.create({
            data: { companyName, roleTitle, status, dateApplied: new Date(dateApplied), jobLink, notes, userId }
        });


        res.status(201).json({
            message: "Application created successfully",
            Application: application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
             message: "Internal Server Error"
        });
    }

}


const getApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const application = await prisma.application.findUnique({ where: { id: parseInt(id, 10), userId: parseInt(userId, 10) } });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.status(200).json({
            message: "Application detail fetch successfully",
            application
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }



}


const getAllApplication = async (req, res) => {
    try {
        const userId = req.userId;

        const applications = await prisma.application.findMany({ where: { userId } });

        return res.status(200).json({
            message: "User all application fetch successfully",
            applications
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const {
            companyName,
            roleTitle,
            status,
            dateApplied,
            jobLink,
            notes,
            followUpDate

        } = req.body;



        const application = await prisma.application.update({
            where: { id: parseInt(id, 10), userId },
            data: {
                companyName,
                roleTitle,
                status,
                dateApplied: dateApplied ? new Date(dateApplied) : undefined,
                jobLink,
                notes,
                followUpDate: followUpDate? new Date(followUpDate): undefined

            }
        })


        return res.status(200).json({
            message: "Application updated successfully",
            application
        })

    } catch (error) {
        console.log(error);


        if (error.code === 'P2025') {
            return res.status(404).json({
                message: "Application not found or unauthorized"
            });
        }

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
}

const deleteApplication = async (req, res) => {
    try{
        const { id } = req.params;
        const userId = req.userId;

        const application = await prisma.application.delete({where:{id:parseInt(id,10),userId}});

        return res.status(200).json({
            message: "Application deleted successfully",
            application
        });


    }catch(error){
        console.log("error:-",error);
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: "Application not found or unauthorized"
            });
        }

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


module.exports = {
    createApplication,
    getAllApplication,
    getApplication,
    updateApplication,
    deleteApplication
}