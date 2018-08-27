app.controller('ServiceController', function ($controller, $scope, ProjectService, Service, ServiceRepo) {

    angular.extend(this, $controller('AbstractScheduleController', {
        $scope: $scope
    }));

    $scope.modalData = {
        title: "Edit",
        type: "service",
        options: ['UP', 'DOWN', 'MAINTENANCE']
    };

    $scope.serviceRepo = ServiceRepo;

    $scope.services = $scope.serviceRepo.getAll();

    $scope.forms = {};

    $scope.serviceToDelete = {};

    ServiceRepo.ready().then(function () {
        $scope.weaverTable = {
            pageSettings: $scope.serviceRepo.getPageSettings(),
            tableParams: $scope.serviceRepo.getTableParams(),
            columns: [{
                    gloss: 'Service',
                    property: 'name',
                    filterable: true,
                    sortable: true
                },
                {
                    gloss: 'Status',
                    property: 'status',
                    filterable: true,
                    sortable: true
                },
                {
                    gloss: 'Auto Updating URL',
                    property: 'serviceUrl',
                    filterable: true,
                    sortable: true
                },
                {
                    gloss: 'Visible to Anonymous Users',
                    property: 'isPublic',
                    filterable: true,
                    sortable: true
                },
                {
                    gloss: 'Prominent Display',
                    property: 'onShortList',
                    filterable: true,
                    sortable: true
                },
                {
                    gloss: 'Project',
                    filterable: false,
                    sortable: false
                },
                {
                    gloss: 'Actions',
                    filterable: false,
                    sortable: false
                }
            ],
            activeSort: [{
                property: 'name',
                direction: 'ASC'
            }]
        };
    });

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
        $scope.serviceRepo.create($scope.serviceData).then(function (res) {
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
        $scope.serviceData.dirty(true);
        $scope.serviceRepo.update($scope.serviceData).then(function (res) {
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

    ServiceRepo.ready().then(function () {
        $scope.tableParams = ServiceRepo.getTableParams();
        $scope.resetServices();
    });

    $scope.confirmDelete = function (service) {
        $scope.openModal('#deleteServiceModal');
        $scope.serviceToDelete = service;
    };

    $scope.deleteService = function () {
        $scope.deleting = true;
        $scope.serviceToDelete.delete().then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.closeModal();
                $scope.deleting = false;
                ServiceRepo.remove($scope.serviceToDelete);
                $scope.serviceToDelete = {};
                $scope.tableParams.reload();
            }
        });
    };

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists textcolor",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | bullist numlist | forecolor backcolor"
    };

});