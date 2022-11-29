    showAll();
    findAllcategory();
    find();
    function showAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/musics',
        success: (singers) => {
            let htmlMusics = ``;
            console.log(singers)
            for (let i = 0; i < singers.length; i++) {
                htmlMusics += `<div class="col-md-4 col-sm-6">
						<!-- featured item -->
						<div class="featured-item ">
							<!-- image container -->
							<div class="figure">
								<!-- image -->
								<img class="img-responsive" src="${singers[i].image}" style="width: 330px; height: 330px" />
								<!-- paragraph -->
							</div>
							<!-- featured information -->
							<div class="featured-item-info">
								<!-- featured title -->
								<h4>${singers[i].name}</h4>
								<!-- horizontal line -->
								<hr/>
								<!-- some responce from social medial or web likes -->
								<center><button class="btn btn-danger" onclick="showDelete('${singers[i]._id}')">Delete</button></center>
								
							</div>
						</div>
					</div>
                         `

            }
            $('#musics').html(htmlMusics);
        }
    })
}



   function findAllcategory() {
       $.ajax({
           type: 'GET',
           url: 'http://localhost:8080/categories',
           headers: {
               'Content-Type': 'application/json'
           },
           success: (chants) => {
               let htmlCategories = '';
               for (let i = 0; i < chants.length; i++) {
                   htmlCategories += `<option value="${chants[i]._id}" name="idSong">${chants[i].name}</option>`
               }
               console.log(chants)
               $('#idSong').html(htmlCategories);
           }
       })
   }

   let idEdit
   function getIdEdit(id) {
       idEdit = id
   }

   function resetFormCreate() {
       $('#name').val('');
       $('#band').val('')
       $('#description').val('');
       $('#image').val('');
       $('#idSong').val();
   }


   function find() {
       $.ajax({
           type: 'GET',
           url: 'http://localhost:8080/categories',
           headers: {
               'Content-Type': 'application/json'
           },
           success: (chants) => {
               let htmlCategories = '';
               for (let i = 0; i < chants.length; i++) {
                   htmlCategories += `<option value="${chants[i]._id}" name="idSongUpdate">${chants[i].name}</option>`
               }
               console.log(chants)
               $('#idSongUpdate').html(htmlCategories);
           }
       })
   }
    function showDelete(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {

            if (result.isConfirmed) {
                $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:8080/musics/' + id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: () => {
                        showAll()
                    }
                })
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }
