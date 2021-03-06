app.repo("FeatureProposalRepo", function FeatureProposalRepo(WsApi, FeatureProposal, ServiceRepo, TableFactory) {

    var featureProposalRepo = this;

    featureProposalRepo.fetchById = function (featureProposalId) {
        var featureProposal = new FeatureProposal();
        angular.extend(featureProposalRepo.mapping.instantiate, {
            'method': featureProposalId
        });
        featureProposal.fetch();
        return featureProposal;
    };

    featureProposalRepo.getPageSettings = function () {
        return table.getPageSettings();
    };

    featureProposalRepo.getTableParams = function () {
        return table.getTableParams();
    };

    featureProposalRepo.fetchPage = function (pageSettings) {
        angular.extend(featureProposalRepo.mapping.page, {
            'data': pageSettings ? pageSettings : table.getPageSettings()
        });
        return WsApi.fetch(featureProposalRepo.mapping.page);
    };

    featureProposalRepo.elevate = function (idea) {
        angular.extend(featureProposalRepo.mapping.elevate, {
            'data': idea
        });
        return WsApi.fetch(featureProposalRepo.mapping.elevate);
    };

    featureProposalRepo.reject = function (fp) {
        angular.extend(featureProposalRepo.mapping.reject, {
            'data': fp
        });
        return WsApi.fetch(featureProposalRepo.mapping.reject);
    };

    featureProposalRepo.vote = function (fp) {
        angular.extend(featureProposalRepo.mapping.vote, {
            'method': fp.id + "/vote"
        });
        return WsApi.fetch(featureProposalRepo.mapping.vote);
    };

    var table = TableFactory.buildTable({
        pageNumber: sessionStorage.getItem('feature-proposals-page') ? sessionStorage.getItem('feature-proposals-page') : 1,
        pageSize: sessionStorage.getItem('feature-proposals-size') ? sessionStorage.getItem('feature-proposals-size') : 10,
        filters: {},
        counts: [5, 10, 25, 50, 100],
        name: 'feature-proposals',
        repo: featureProposalRepo
    });

    var updateFeatureProposal = function (featureProposal) {
        var featureProposals = featureProposalRepo.getContents();
        for (var i in featureProposals) {
            if (featureProposals[i].id === featureProposal.id) {
                angular.extend(featureProposals[i], featureProposal);
                return;
            }
        }
    };

    WsApi.listen(featureProposalRepo.mapping.createListen).then(null, null, function (response) {
        ServiceRepo.addFeatureProposal(new FeatureProposal(angular.fromJson(response.body).payload.FeatureProposal));
        table.getTableParams().reload();
    });

    WsApi.listen(featureProposalRepo.mapping.updateListen).then(null, null, function (response) {
        var featureProposal = new FeatureProposal(angular.fromJson(response.body).payload.FeatureProposal);
        ServiceRepo.updateFeatureProposal(featureProposal);
        updateFeatureProposal(featureProposal);
        table.getTableParams().reload();
    });

    WsApi.listen(featureProposalRepo.mapping.deleteListen).then(null, null, function (response) {
        ServiceRepo.removeFeatureProposalById(angular.fromJson(response.body).payload.Long);
        table.getTableParams().reload();
    });

    return featureProposalRepo;

});