const ResourceNotFound = use('App/Exceptions/ResourceNotFoundException');

class ResourceService {
  notFound(object) {
    if (!object) {
      throw new ResourceNotFound();
    }
  }
}

module.exports = new ResourceService();
