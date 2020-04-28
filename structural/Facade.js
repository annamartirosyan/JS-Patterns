let currentId = 0;

class ComplaintRegistry {
    registerComplaint(customer, type, details) {
        const id = ComplaintRegistry._uniqueIdGenerator();
        let registry;
        if (type === 'service') {
            registry = new ServiceComplaints();
        } else {
            registry = new ProductComplaints();
        }
        return registry.addComplaint({ id, customer, details });
    }

    static _uniqueIdGenerator() {
        return ++currentId;
    }
}

class Complaints {
    constructor() {
        this.complaints = [];
    }

    addComplaint(complaint) {
        this.complaints.push(complaint);
        return this.replyMessage(complaint);
    }

    getComplaint(id) {
        return this.complaints.find(complaint => complaint.id === id);
    }

    replyMessage(complaint) {}
}

class ProductComplaints extends Complaints {
    constructor() {
        super();
        if (ProductComplaints.exists) {
            return ProductComplaints.instance;
        }
        ProductComplaints.instance = this;
        ProductComplaints.exists = true;
        return this;
    }

    replyMessage({ id, customer, details }) {
        return `Product Complaint No. ${id} reported by ${customer} regarding ${details}`;
    }
}

class ServiceComplaints extends Complaints {
    constructor() {
        super();
        if (ServiceComplaints.exists) {
            return ServiceComplaints.instance;
        }
        ServiceComplaints.instance = this;
        ServiceComplaints.exists = true;
        return this;
    }

    replyMessage({ id, customer, details }) {
        return `Service Complaint No. ${id} reported by ${customer} regarding ${details}`;
    }
}

// usage
const registry = new ComplaintRegistry();

const reportService = registry.registerComplaint('Martha', 'service', 'availability');
// 'Service Complaint No. 1 reported by Martha regarding availability'

const reportProduct = registry.registerComplaint('Jane', 'product', 'faded color');
// 'Product Complaint No. 2 reported by Jane regarding faded color'
