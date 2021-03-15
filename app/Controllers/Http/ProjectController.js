'use strict'

const Project = use('App/Models/Project');
const AuthService = use('App/Services/AuthService');
const ResourceService = use('App/Services/ResourceService');

class ProjectController {
  async index({ auth }) {
    const user = await auth.getUser()
    return {
      data: await user.projects().fetch()
    };
  }

  async create({ auth, request }) {
    const user = await auth.getUser()
    const { name } = request.all()
    const project = new Project();
    project.fill({
      name,
    });
    await user.projects().save(project);

    return project
  }

  async destroy({ auth, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);

    ResourceService.notFound(project);
    AuthService.verifyAccess(project, user);

    await project.delete();

    return {
      msg: `Project With The Id: ${id} Deleted!`
    }
  }

  async update({ auth, params, request }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);

    ResourceService.notFound(project);
    AuthService.verifyAccess(project, user);

    project.merge(request.only('name'))

    await project.save();

    return {
      msg: `Project With The Id: ${id} Updated!`,
      project
    }
  }
}

module.exports = ProjectController
