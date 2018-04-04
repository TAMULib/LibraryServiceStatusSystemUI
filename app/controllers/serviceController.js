app.controller('ServiceController', function ($controller, $route, $scope, ProjectService, Service, ServiceRepo, NgTableParams) {

    angular.extend(this, $controller('AbstractScheduleController', {
        $scope: $scope
    }));

    $scope.modalData = {
        title: "Edit",
        type: "service",
        options: ['UP', 'DOWN', 'MAINTENANCE']
    };

    $scope.serviceRepo = ServiceRepo;

    $scope.services = ServiceRepo.getAll();

    $scope.forms = {};

    $scope.serviceToDelete = {};

    ProjectService.getAll().then(function (projects) {
        $scope.projects = projects;

        $scope.getProject = function (service) {
            if (service.projectId && !service.project) {
                service.project = {};
                ProjectService.getById(service.projectId).then(function (project) {
                    angular.extend(service, {
                        project: project
                    });
                });
                return service.project;
            }
            return service.project;
        };

    });

    $scope.resetServices = function () {
        if ($scope.serviceData) {
            $scope.serviceData.refresh();
            $scope.serviceData.clearValidationResults();
        }
        for (var key in $scope.forms) {
            if (!$scope.forms[key].$pristine) {
                $scope.forms[key].$setPristine();
            }
        }
        $scope.serviceData = new Service({
            name: '',
            description: '',
            isPublic: false,
            onShortList: false,
            isAuto: false,
            status: 'UP'
        });
        $scope.closeModal();
    };

    $scope.resetServices();

    $scope.createService = function () {
        if ($scope.serviceData.isAuto) {
            $scope.serviceData.status = 'UP';
        } else {
            $scope.serviceData.isAuto = false;
        }
        ServiceRepo.create($scope.serviceData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetServices();
            }
        });
    };

    $scope.editService = function (service) {
        $scope.serviceData = service;
        $scope.openModal('#editServiceModal');
    };

    $scope.updateService = function () {
        ServiceRepo.update($scope.serviceData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetServices();
            }
        });
    };

    $scope.editSchedule = function (service) {
        $scope.data = service;
        $scope.openModal('#editScheduleModal');
    };

    $scope.resetSchedule = function () {
        $scope.resetServices();
    };

    var buildTable = function () {
        var allServices = ServiceRepo.getAll();
        $scope.tableParams = new NgTableParams({
            count: allServices.length
        }, {
            counts: [],
            filterDelay: 0,
            dataset: allServices
        });
    };

    ServiceRepo.ready().then(function () {
        buildTable();
        $scope.tableParams.reload();
    });

    $scope.confirmDelete = function (service) {
        $scope.openModal('#deleteServiceModal');
        $scope.serviceToDelete = service;
    };

    $scope.deleteService = function () {
        $scope.deleting = true;
        $scope.serviceToDelete.delete().then(function () {
            $scope.closeModal();
            $scope.deleting = false;
            ServiceRepo.remove($scope.serviceToDelete);
            $scope.serviceToDelete = {};
            $scope.tableParams.reload();
        });
    };

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists textcolor",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | bullist numlist | forecolor backcolor"
    };

});