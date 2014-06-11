'use strict';

/* Services */

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

angular.module('troue.services', ['ngResource', 'jsJavaOpenSave.DM'])
 
.factory('Recorder', ['$http', function($http) {
    return {
        getStatusAsync: function() {
            return $http.get('/hsfr/recorder/status');
        },
        getStatus: function(data) {
            data || (data = {});
            this.getStatusAsync().success(function(respData) {
                var key, parts;
                for (key in respData['channels']) {
                    parts = respData['channels'][key]['fileName'].split('/');
                    respData['channels'][key]['fileName'] = parts[parts.length-1];
                }
                for (var key in respData) {
                    data[key] = respData[key];
                }
            });
            return data;
        },
        startRecording: function() {
            $http.post('/hsfr/recorder/start');
        },
        stopRecording: function() {
            $http.post('/hsfr/recorder/stop');
        }
    };
}])

.factory('RecordedFiles', ['$http', 'jjosDownloaderManager', function($http, dm) {
    // Downloaded files info is cached locally to allow navigation while downloads are in progress.
    var filesData = {},
    RecordedFiles = {
        setConcurrentDownloads: function(count) {
            dm.setMaxDownloads(count);
        },
        downloadsIdle: function() {
            return dm.idle();
        },
        allDownloadsStatus: function() {
            return dm.status;
        },
        cancelAllDownloads: function() {
            return dm.cancelAll();
        },
        fileList: function() {
            $http.get('/hsfr/files/list').success(function(respData) {
                var urlPath = 'http://' + window.location.hostname + '/ssd/',
                    key, file;
                // Save the old files by name
                var filesByName = {};
                for (key in filesData['files']) {
                    filesByName[filesData['files'][key].name] = filesData['files'][key];
                }
                // Update the download manager with the default concurrent downloads if not set yet.
                filesData['concurDownloads'] || RecordedFiles.setConcurrentDownloads(respData['concurDownloads']);
                // Default values, so only update of not set locally.
                for (key in respData) {
                    filesData[key] || (filesData[key] = respData[key]);
                }
                // Add new files and remove old ones, but don't change existing files.
                filesData['files'] = [];
                for (key in respData['files']) {
                    file = respData['files'][key];
                    filesData['files'][key] = filesByName[file.name] ? filesByName[file.name]
                                            : dm.remoteFile(file.name, urlPath + file.name, file.size, file.date);
                }
            });
            return filesData;
        },
        deleteAll: function() {
            var self = this;
            $http.post('/hsfr/files/delete-all').success(function() {
                self.fileList();
            });
            return filesData;
        },
        saveOldest: function(fileName) {
            $http.post('/hsfr/files/set-oldest', {name:fileName});
        }
    };
    return RecordedFiles;
  }
])
 
.factory('RecordingChannels', ['$resource',
  function($resource) {
    return $resource('/hsfr/config/record-channels', {}, {
        save : {method : 'POST'}
    });
  }
])
 
.factory('InputStreams', ['$resource',
  function($resource) {
    return $resource('/hsfr/config/input-streams', {}, {
        save : {method : 'POST', isArray:true}
    });
  }
])
 
.factory('TlanConfig', ['$resource',
  function($resource) {
    return $resource('/hsfr/config/tlan');
  }
])

.factory('Programmer', ['$http', '$upload', function($http, $upload) {
    var assignData = function(src, dst) {
            for (var key in src) {
                dst[key] = src[key];
            }
        };
    return {
        saveIpAddress: function(ipAddress, subnetMask) {
            $http.post('/hsfr/programmer/ip-address', {
                ipAddress : ipAddress,
                subnetMask : subnetMask
            });
            return ipAddress;
        },
        currentStatus: function() {
            var data = {};
            $http.get('/hsfr/programmer/current').then(function(response) {
                assignData(response.data, data);
            });
            return data;
        },
        upload: function(file, success) {
            var upload = {
                isBusy   : true,
                progress : 0,
                error    : '',
                data     : {}
            };
            upload.upload = $upload.upload({
                url: '/hsfr/programmer/upload',
                file: file
            }).progress(function(ev) {
                upload.progress = parseInt(100.0 * ev.loaded / ev.total);
            }).success(function(data) {
                assignData(data, upload.data);
                upload.isBusy = false;
            }).success(success).error(function(data) {
                upload.isBusy = false;
                upload.error = data;
            });
            return upload;
        },
        confirmWrite: function(type, model, success) {
            var data = model;
            $http.post('/hsfr/programmer/confirm-'+type, model).success(function(respData) {
                assignData(respData, data);
            }).success(success);
            return data;
        }
    };
}]);