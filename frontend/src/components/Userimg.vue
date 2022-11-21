<template>
  <div>
    <!-- <span><img src="" height="200" alt="이미지 미리보기"></span> -->
    <form action="">
        <input type="file" id="chooseFile" name="chooseFile" class="img-input" @change="handleImgInput" required>
        <button class="submit-btn">사진업로드</button>
    </form>
    <div class="img">
        
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userimg',
  data() {
    return {
      realInput : document.querySelector(".img-input"),
      imgTag : document.querySelector(".img")
    }
  },
  methods: {
    resizeImage (settings) {
      const file = settings.file;
      const maxSize = settings.maxSize;
      const reader = new FileReader();
      const image = new Image();
      const canvas = document.createElement("canvas");

      const dataURItoBlob = (dataURI) => {
        const bytes =
          dataURI.split(",")[0].indexOf("base64") >= 0
            ? atob(dataURI.split(",")[1])
            : unescape(dataURI.split(",")[1]);
        const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
      }
      const resize = () => {
        let width = image.width;
        let height = image.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        return dataURItoBlob(dataUrl);
      },
      async result = ((ok, no) => {
        if (!file) {
          return;
        }
        if (!file.type.match(/image.*/)) {
          no(new Error("Not an image"));
          return;
        }
        reader.onload = (readerEvent) => {
          image.onload = () => {
            return ok(resize());
          };
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
      })
    },

    handleImgInput(e)  {
      const config = {
        file: e.target.files[0],
        maxSize: 350,
      };
      resizeImage(config)
        .then((resizedImage) => {
          const url = window.URL.createObjectURL(resizedImage);
          const img = document.createElement("img");
          img.setAttribute("src", url);
          img.className = "profile-img";
          img.style.display = "block";
          imgTag.appendChild(img);
        })
        .then(() => {
          const img = document.querySelector(".profile-img");
          img.onload = () => {
            const widthDiff = (img.clientWidth - imgTag.offsetWidth) / 2;
            const heightDiff = (img.clientHeight - imgTag.offsetHeight) / 2;
            img.style.transform = `translate( -${widthDiff}px , -${heightDiff}px)`;
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<style>

</style>