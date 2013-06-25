define(["jquery", "marionette", "hbars!template/WidgetList", "PublicationAPI", "configuration/bootstrap/ProgressBar"],
    function ($, Marionette, WidgetList, PublicationAPI, ProgressBar) {
        "use strict";

        var publicationIdRegex = /[0-9a-f]{8}/g;

        var api = new PublicationAPI("");

        return Marionette.Layout.extend({
            template: WidgetList,
            regions: {
                progressBar: "#progressbar"
            },
            ui: {
                widgetList: "#widgetlist",
                publication: "#publication",
                loadWarning: "#warning-load"
            },
            events: {
                "keyup #publication": function () {
                    var scope = this,
                        id = publicationIdRegex.match(this.ui.publication.val());

                    if (id) {
                        this.ui.widgetList.clear();
                        this.ui.loadWarning.hide();
                        this.progressBar.currentView.show();

                        api.getPublication(id)
                            .fail(function () {
                                scope.ui.loadWarning.show();
                            })
                            .then(function (publication) {
                                return publication.getPages();
                            })
                            .progress(function (progress) {
                                scope.progressBar.currentView.update(progress);
                            })
                            .then(function (pages) {
                                scope.progressBar.currentView.hide();

                                pages.forEach(function (page) {
                                    page.getEnrichments()
                                        .then(function (enrichments) {
                                            enrichments.forEach(function (enrichment) {
                                                if (enrichment.type === "iframeWidget") {
                                                    var element = $("<div>" + page.pageNumber + ": " + enrichment.url + "</div>")
                                                        .on("click", function () {
                                                            console.log(page.pageNumber + ": " + enrichment.url);
                                                        });

                                                    scope.widgetList.append(element);
                                                }
                                            });
                                        });
                                });
                            });
                    }
                }
            },
            onRender: function () {
                this.progressBar.show(new ProgressBar());

                this.bindUIElements();
            }
        });
    });