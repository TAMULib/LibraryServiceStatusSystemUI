describe('service: ProjectService', function () {

    var WsApi, ProjectService;

    beforeEach(module('core'));

    beforeEach(module('app'));

    beforeEach(module('mock.projects'));

    beforeEach(module('mock.wsApi'));

    beforeEach(inject(function ($q, _WsApi_, $injector) {
        ProjectService = $injector.get('ProjectService');
        WsApi = _WsApi_;
        installPromiseMatchers();
    }));

    describe('Are the service methods defined', function () {
        it('getAll should be defined', function () {
            expect(ProjectService.getAll).toBeDefined();
            expect(typeof ProjectService.getAll).toEqual("function");
        });
        it('getById should be defined', function () {
            expect(ProjectService.getById).toBeDefined();
            expect(typeof ProjectService.getById).toEqual("function");
        });
        it('submitRequest should be defined', function () {
            expect(ProjectService.submitRequest).toBeDefined();
            expect(typeof ProjectService.submitRequest).toEqual("function");
        });
    });

    describe('Do the service methods work as expected', function () {
        it('getAll should return all mock projects', function () {
            expect(ProjectService.getAll()).toBeResolvedWith(mockProjects);
        });
        it('getById should return the correct project', function () {
            expect(ProjectService.getById(1)).toBeResolvedWith(mockProjects[0]);
            expect(ProjectService.getById(2)).toBeResolvedWith(mockProjects[1]);
            expect(ProjectService.getById(3)).toBeResolvedWith(mockProjects[2]);
            expect(ProjectService.getById(5)).toBeResolvedWith(mockProjects[4]);
            expect(ProjectService.getById(9)).toBeResolvedWith(mockProjects[8]);
        });
        it('submitRequest should return all mock projects', function () {
            var featureRequest = {
                type: 'FEATURE',
                title: 'Test feature request',
                description: 'This is a test feature request on project 1',
                project: 1
            };
            expect(ProjectService.submitRequest(featureRequest)).toBeResolvedWith('Successfully submitted feature request!');
            var issueRequest = {
                type: 'ISSUE',
                title: 'Test issue request',
                description: 'This is a test issue request on project 1',
                project: 1
            };
            expect(ProjectService.submitRequest(issueRequest)).toBeResolvedWith('Successfully submitted issue request!');
        });
    });

});