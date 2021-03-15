'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthService = use('App/Services/AuthService');
const ResourceService = use('App/Services/ResourceService');

class TaskController {
  async create({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);

    ResourceService.notFound(project);
    AuthService.verifyAccess(project, user);

    const { name } = request.all();

    const task = new Task();
    task.fill({
      name: name
    })

    await project.tasks().save(task)

    return {
      msg: "Created!",
      task
    }
  }

  async index({ auth, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);

    ResourceService.notFound(project);
    AuthService.verifyAccess(project, user);

    const tasks = await project.tasks().fetch()

    return tasks
  }

  async done({ auth, params }) {
    const user = await auth.getUser();
    const project = await Project.find(params.project);

    ResourceService.notFound(project);
    AuthService.verifyAccess(project, user);

    const task = await Task.find(params.id)

    task.merge({done: true});
    await task.save();

    return {
      msg: `Task With The Id: ${params.id} Updated!`,
      task
    }
  }
}

module.exports = TaskController
