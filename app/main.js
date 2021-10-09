// Get the template HTML and remove it from the doument.
var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

var myDropzone = new Dropzone("#mainForm", {
  url: "/upload.php", // Set the url
  thumbnailWidth: 80,
  thumbnailHeight: 80,
  parallelUploads: 20,
  maxFilesize: 500000, // bytes
  acceptedFiles: "image/heic,image/*,video/*",
  previewTemplate: previewTemplate,
  autoQueue: false, // Make sure the files aren't queued until manually added
  autoProcessQueue: false,
  previewsContainer: "#previews", // Define the container to display the previews
  clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
});

myDropzone.on("addedfile", function(file) {
  document.getElementById("mainSubmitBtn").classList.remove("disabled");
  document.getElementById("removeBtn").classList.remove("disabled");
  // Hookup the start button
  // file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
});

// Update the total progress bar
myDropzone.on("totaluploadprogress", function(progress) {
  document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
});

myDropzone.on("sending", function(file) {
  // Show the total progress bar when upload starts
  document.querySelector("#total-progress").style.opacity = "1";

  document.getElementById("mainSubmitBtn").classList.add("disabled");
  document.getElementById("removeBtn").classList.add("disabled");
  document.getElementById("addBtn").classList.add("disabled");
  // And disable the start button
  // file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
});

// Hide the total progress bar when nothing's uploading anymore
myDropzone.on("queuecomplete", function(progress) {
  myDropzone.options.autoProcessQueue = false;
  document.querySelector("#total-progress").style.opacity = "0";

  document.getElementById("mainSubmitBtn").classList.remove("disabled");
  document.getElementById("removeBtn").classList.remove("disabled");
  document.getElementById("addBtn").classList.remove("disabled");

  var successModal = new bootstrap.Modal(document.getElementById("successModal"), {});
  successModal.show()
});

// Setup the buttons for all transfers
// The "add files" button doesn't need to be setup because the config
// `clickable` has already been specified.
// document.querySelector("#actions .start").onclick = function() {
//   myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
// };
document.querySelector("#actions .cancel").onclick = function() {
  myDropzone.removeAllFiles(true);
};

document.querySelector("#mainSubmitBtn").addEventListener("click", function(e) {
  // Make sure that the form isn't actually being sent.
  e.preventDefault();
  e.stopPropagation();
  myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
  myDropzone.options.autoProcessQueue = true;
  myDropzone.processQueue();
});

function nameInputChanging(input) {
  console.log(input.value);
  if(input.value.length > 0) {
    document.getElementById("addBtn").classList.remove("disabled");
  }
  else{
    document.getElementById("addBtn").classList.add("disabled");
  }
}
