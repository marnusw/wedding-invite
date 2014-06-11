'use strict';

/* Controllers */

angular.module('troue.controllers', [])
  
    .controller('RecorderCtrl', ['$scope', '$timeout', 'Recorder', 'RecordingChannels', 
      function($scope, $timeout, Recorder, RecordingChannels) {
        $scope.startRecording = Recorder.startRecording;
        $scope.stopRecording = Recorder.stopRecording;
        
        $scope.recChSettings = RecordingChannels.get();
        $scope.states = ['Enabled', 'Disabled'];
        
        $scope.errorState = function() {
            return $scope.recorder.state === 'Error';
        };
        $scope.$on("$destroy", function() {
            $timeout.cancel(timer);
        });
        
        var timer,
            getStatusInterval = 1000,
            getStatus = function() {
                $scope.recorder = Recorder.getStatus($scope.recorder);
                timer = $timeout(getStatus, getStatusInterval);
            };
        getStatus();
    }])
    
    .controller('RecordedFilesCtrl', ['$scope', '$modal', 'filterFilter', 'fileDialogue', 'RecordedFiles', 'RecordingChannels',
      function($scope, $modal, filter, fileDialogue, RecordedFiles, RecordingChannels) {
        fileDialogue.preLoadApplet();
          
        $scope.recChSettings = RecordingChannels.get();
        $scope.recordings = RecordedFiles.fileList();
        $scope.allDownloads = RecordedFiles.allDownloadsStatus();

        $scope.chooseFolder = function() {
            var folder = fileDialogue.chooseFolder($scope.recordings.downloadFolder || '');
            folder && ($scope.recordings.downloadFolder = folder);
        };
        var pathIsSet = function() {
            if (!$scope.recordings.downloadFolder) {
                $modal.open({
                    templateUrl: '/modals/select-download-path.html'
                });
                return false;
            }
            return true;
        };
        
        $scope.concurDownloadsChanged = function () {
            RecordedFiles.setConcurrentDownloads($scope.recordings.concurDownloads);
        };
        
        var selectedFiles = [];
        
        $scope.downloadSelected = function() {
            if (pathIsSet() ) {
                for (var f in selectedFiles) {
                    $scope.startDownload(selectedFiles[f]);
                }
            }
        };
        $scope.startDownload = function(file) {
            if (pathIsSet() ) {
                var lastChar = $scope.recordings.downloadFolder.slice(-1);
                file.downloadTo($scope.recordings.downloadFolder + (lastChar === '/' || lastChar === '\\' ? '' : '/') + file.name);
                file.selected = true;
            }
        };
        
        $scope.idle = RecordedFiles.downloadsIdle;
        $scope.cancelAll = RecordedFiles.cancelAllDownloads;
        $scope.cancelDownload = function(file) {
            file.cancel();
        };
        $scope.clearStatus = function(file) {
            file.selected = false;
            file.reset();
        };
        $scope.clearAll = function() {
            for (var f in $scope.recordings.files) {
                $scope.recordings.files[f].selected = false;
                $scope.recordings.files[f].reset();
            }
        };
        
        $scope.filteredFilesCh = function(ch) {
            var pattern = new RegExp('^' + $scope.recordings.fileNamePrefix + ch, 'i'),
                f, filteredFiles = [];
            for (f in $scope.recordings.files) {
                if ($scope.recordings.files[f].name.match(pattern)) {
                    filteredFiles.push($scope.recordings.files[f]);
                }
            }
            return filteredFiles;
        };
        $scope.saveOldestFile = function() {
            if ($scope.recordings.lastDownloadedFile !== undefined) {
                RecordedFiles.saveOldest($scope.recordings.lastDownloadedFile);
            }
        };
        $scope.deleteAllFiles = function() {
            $modal.open({
                templateUrl: '/modals/delete-all-confirm.html'
            }).result.then(function() {
                $scope.recordings = RecordedFiles.deleteAll();
            });
        };
        
        $scope.selectedCount = function() {
            return selectedFiles ? selectedFiles.length : 0;
        };
        $scope.$watch('recordings.files|filter:{selected:true,state:"none"}', function (values) {
            selectedFiles = values;
        }, true);
        $scope.selectAll = function(ch) {
            selDeselAll(ch, true);
        };
        $scope.deselectAll = function(ch) {
            selDeselAll(ch, false);
        };
        function selDeselAll(ch, select) {
            var name = $scope.recordings.fileNamePrefix + ch,
                f, files = filter($scope.recordings.files, {name:name, state:'none'});
            for (f in files) {
                files[f].selected = select;
            }
        }
        
        $scope.securityModal = function() {
            $modal.open({
                templateUrl: '/modals/download-security.html'
            });
        };
    }])

    .controller('RecordingChannelsCtrl', ['$scope', '$modal', 'RecordingChannels', 'InputStreams', 'RecordedFiles',
      function($scope, $modal, RecordingChannels, InputStreams, RecordedFiles) {
        $scope.recChSettings = RecordingChannels.get();
        $scope.streams = InputStreams.query();
        $scope.edit = {};
        
        $scope.isEnabled = function(component) {
            return component && component.status === 'Enabled';
        };
        $scope.saveChange = function() {
            RecordingChannels.save($scope.recChSettings);
        };
        
        $scope.editSsd = function(index, channel) {
            $scope.edit['backup'+index] = angular.copy(channel.ssd);
            $scope.edit[index] = true;
        };
        $scope.cancelSsd = function(index, channel) {
            channel.ssd = angular.copy($scope.edit['backup'+index]);
            $scope.edit[index] = false;
        };
        $scope.saveSsd = function(index) {
            if ($scope.spaceExceded()) {
                $modal.open({
                    templateUrl: '/modals/ssd-space-exceeded.html',
                    scope: $scope
                });
            } else {
                $modal.open({
                    templateUrl: '/modals/ssd-settings-update.html'
                }).result.then(function() {
                    $scope.saveChange();
                    RecordedFiles.deleteAll();
                    $scope.edit[index] = false;
                });
            }
        };
        $scope.calcSsdSize = function(channel) {
            channel.ssd.space = channel.ssd.numFiles * channel.ssd.fileSize;
        };
        $scope.totalSize = function() {
            var c, size = 0;
            for (c in $scope.recChSettings.channels) {
                size += $scope.recChSettings.channels[c].ssd.space * 1000000;
            }
            return size;
        };
        $scope.spaceExceded = function() {
            return $scope.totalSize() > $scope.recChSettings.ssdTotalSize * 1000000;
        };
        
        $scope.uniqueSortAndSave = function(items) {
            var i, added = items[items.length-1];
            for (i in items) {
                if (items[i] == added && i != items.length-1) {
                    items.pop();
                    break;
                }
            }
            items.sort(function(a,b){return a-b;}); // Numeric sort ascending
            $scope.saveChange();
        };
    }])

    .controller('InputStreamsCtrl', ['$scope', 'InputStreams', function($scope, InputStreams) {
        $scope.streams = InputStreams.query();
        $scope.edit = [];
        
        $scope.saveChange = function() {
            InputStreams.save($scope.streams);
        };
        $scope.editDataRate = function(index) {
            $scope.edit[index] = true;
        };
        $scope.saveDataRate = function(index) {
            $scope.edit[index] = false;
            $scope.saveChange();
        };
    }])

    .controller('TlanConfigCtrl', ['$scope', 'TlanConfig', function($scope, TlanConfig) {
        $scope.reportPacket  = {edit : false};
        $scope.startStopCtrl = {edit : false};
        
        $scope.tlan = TlanConfig.get();

        /**
         * Toggle the edit status of a given section.
         * @param {String} section Either 'reportPacket' or 'startStopCtrl'
         */
        var toggleEdit = function(section) {
            $scope[section].edit = !$scope[section].edit;
        };
        /**
         * Toggle the edit state of a given section. When switching to editing the model 
         * is backed up first, when switching back to the view the model is saved.
         * 
         * @param {String} section Either 'reportPacket' or 'startStopCtrl'
         */
        $scope.editOrSave = function(section) {
            if ($scope[section].edit) {
                TlanConfig.save($scope.tlan); // Post to the server
            } else {
                $scope[section].backup = angular.copy($scope.tlan[section]); // Backup before the edit
            }
            toggleEdit(section);
        };
        /**
         * Restore the backed up version of a given model and switch to the view state.
         * @param {String} section Either 'reportPacket' or 'startStopCtrl'
         */
        $scope.cancelEdit = function(section) {
            $scope.isUnchanged(section) || ($scope.tlan[section] = angular.copy($scope[section].backup));
            toggleEdit(section);
        };
        /**
         * Whether the model has been modified since the last backup.
         * @param {String} section Either 'reportPacket' or 'startStopCtrl'
         * @returns {Boolean}
         */
        $scope.isUnchanged = function(section) {
            return angular.equals($scope.tlan[section], $scope[section].backup);
        };
    }])

    /**
     * The programmer workflow:
     * 
     *  1. View the current information (file name, CRC, notes).
     *  2. Clicking the Update button shows a form for uploading a file.
     *  3. Selecting a file for upload starts the upload immediately and shows a progress bar.
     *  4. When the upload completes the uploaded file CRC and info is displayed for comparison with a form for notes.
     *  5. Applying the uploaded file and saving the notes  can be confirmed or cancelled.
     *  6. Confirming the operation shows an animated gif until the write completes.
     *  7. When the write completes or the action is cancelled in 5. the state returns to the initial view.
     * 
     */
    .controller('ProgrammerCtrl', ['$scope', 'Programmer', function($scope, Programmer) {
        $scope.program = Programmer.currentStatus();
        $scope.network = {edit:false};
        $scope.sections = [
            {id:'config', state:'view', descr:'HSFR config file', canExport:true},
            {id:'flash',  state:'view', descr:'flash image', crc:true},
            {id:'app',    state:'view', descr:'SD card application', crc:true}
        ];
        
        $scope.toggleNetwEdit = function(save) {
            if (!$scope.network.edit) {
                $scope.network.edit = true;
                $scope.network.backup = {
                    ipAddress : $scope.program.ipAddress,
                    subnetMask : $scope.program.subnetMask
                };
            } else {
                $scope.network.edit = false;
                if (save) {
                    Programmer.saveIpAddress($scope.program.ipAddress, $scope.program.subnetMask);
                } else {
                    $scope.program.ipAddress = $scope.network.backup.ipAddress;
                    $scope.program.subnetMask = $scope.network.backup.subnetMask;
                }
            }
        };
        
        $scope.preloadWriteImg = function() {
            new Image().src = '/img/busy.gif';
        };
        
        $scope.crcsMatch = function(section) {
            return section.upload && section.upload.data.crc === $scope.program[section.id].crc;
        };
        
        $scope.isView = function(section) {
            return section.state === 'view';
        };
        $scope.canCancel= function(section) {
            return section.state !== 'writing';
        };
        
        /**
         * 
         * @param {Object} section The section object under consideration
         */
        $scope.toggleEdit = function(section) {
            section.state = $scope.isView(section) ? 'upload' : 'view';
            delete $scope.program[section.id].success;
        };
        /**
         * 
         * @param {Array} $files
         * @param {Object} section The section object under consideration
         */
        $scope.onFileSelect = function($files, section) {
            var _section = section;
            section.upload = Programmer.upload($files[0], function() {
                _section.state = 'confirm';
            });
        };
        /**
         * 
         * @param {Object} section The section object under consideration
         */
        $scope.confirmWrite = function(section) {
            var _section = section;
            section.state = 'writing';
            $scope.program[section.id] = Programmer.confirmWrite(section.id, section.upload.data, function() {
                _section.state = 'view';
            });
        };
        /**
         * 
         * @param {Object} section The section object under consideration
         */
        $scope.closeSuccessAlert = function(section) {
            delete $scope.program[section.id].success;
        };
    }]);