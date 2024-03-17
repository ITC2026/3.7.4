import { type RequestHandler, type Request, type Response } from "express";
import { Project } from "../models/projects";

export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  Project.create({ ...req.body })
    .then((data: Project) => {
      return res.status(201).json({
        status: "Success",
        message: "Project created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not created",
        payload: error.message,
      });
    });
};

export const getProjects: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Project.findAll()
    .then((data: Project[] | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Projects retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Projects not retrieved",
        payload: error.message,
      });
    });
};

export const getProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then((data: Project | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Project retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not retrieved",
        payload: error.message,
      });
    });
};

export const updateProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const id = req.params.id;
  Project.update({ ...req.body }, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
        return res.status(200).json({
          status: "Success",
          message: "Project updated successfully",
          payload: { ...req.body },
        });
      }

      return res.status(500).json({
        status: "Success",
        message: "Something happened updating the product",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: `Project not updated: ${error.message}`,
        payload: null,
      });
    });
};

export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    await Project.destroy({ where: { id } });
    return res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting projects.",
      error,
    });
  }
};
