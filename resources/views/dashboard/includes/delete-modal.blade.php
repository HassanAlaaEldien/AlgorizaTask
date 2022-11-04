<!--begin::Modal-->
<div class="modal fade" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Action</h5>
            </div>
            <div class="modal-body">
                @if(isset($custom) && $custom === true)
                    <p>{{ $action_message }}</p>
                @else
                    <p>
                        Are you sure that you want to delete
                        {{ isset($action_message) ? $action_message : 'this item' }} ?
                    </p>
                @endif
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-danger" id="delete-button">Yes</button>
            </div>
        </div>
    </div>
</div>
<!--end::Modal-->
