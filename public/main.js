(function(){
    'use strict'

    const deleteButton = $('#delete')
    console.log(deleteButton)
    deleteButton.click(() => {
        const id = deleteButton.data('id')
        const _csrf = deleteButton.data('csrf')
        console.log(11)
        $.ajax({
            url: `/posts/${ id }`,
            method: 'DELETE',
            data: { _csrf },
            success: (response) => {
                console.log(response)
            }
        })
    })
}())