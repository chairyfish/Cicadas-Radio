$(document).ready(function(){
  $('#uploadFiles').click(function(){
      $('#fileInput').click(function(){
          var file = fileInput.files[0];
          if(file.type !== 'mp3'){
              alert('不是有效的音频文件！');
              return;
          }
          var label = $('label')[0];
          label.innerHTML += '<br>'+file.name;
          var fd = new FormData();
          fd.append("upload", 1);
          fd.append("file", $("#fileInput").get(0).files[0]);
          $.ajax({
              url: "upload_file.php",
              type: "POST",
              processData: false,
              contentType: false,
              data: fd,
              success: function(d) {
                  console.log(d);
                  alert('上传成功');
              }
          });
      })
  })

})
