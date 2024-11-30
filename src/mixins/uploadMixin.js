export default {
    methods: {
        uploadClick(id) {
            document.querySelector(`#${id}`).click()
        },
        async uploadImage() {
            const file = this.$refs.img.files[0];
            
            if(file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    console.error("Unsupported file. The file type must be \"png, jpg or jpeg\"");
                }else {
                    if (this.checksize(file.size)) {
                        this.form.image = URL.createObjectURL(file);

                        this.uploading = true

                        const formData = new FormData();
                        formData.append("image", file);
                        try {
                            const response = await fetch("http://localhost:3000/api/upload-image", {
                                method: "POST",
                                body: formData
                            })
                            const data = await response.json()
                            if (data.imageUrl) {
                                this.form.image = data.imageUrl
    
                                this.form.fileType = file.type
                                this.$nextTick(() => {
                                    this.$refs.textArea?.focus();
                                });
                            }
                        } catch (error) {
                            console.error("Error uploading the image:", error);
                        } finally {
                            this.uploading = false
                        }
                    }else {
                        console.error('This file is too large. The file size must be less than 800KB');
                    }
                }
            }
        },
        checksize(size) {
            return size > 800000 ? false : true
        },
        async deleteImage(image) {
            this.deleting = true
            const filename = image.split('/').pop();

            try {
                const response = await fetch(`http://localhost:3000/api/delete-image/${filename}`, {
                    method: 'DELETE',
                });

                const data = await response.json()
                if (response.status === 200) {
                    this.form.image = null
                    this.deleting = false
                    this.clrOldfile('imageUploadInput')
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                this.deleting = false
                console.error('Error deleting the image:', error);
            }
        },
        clrOldfile(id) {
            document.querySelector(`#${id}`).value = null
        }
    }
}