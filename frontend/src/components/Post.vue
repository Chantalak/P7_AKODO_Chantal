<template>
    <div class="message">
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8">
                    <div class="d-flex flex-column comment-section">
                        <form>
                            <input type="email" class="form-control" placeholder="Quoi de neuf?">
                        </form>

                        <div class="mt-2 text-right">
                            <button type="button" class="btn btn-link"><i class="fa fa-camera"></i></button>
                            <button type="button" class="btn btn-link"><i class="fa fa-video-camera"></i></button>
                            <button class="btn btn-outline-primary btn-sm ml-1 shadow-none" v-on:click="createMessage()">Envoyer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
button {
    box-sizing: border-box;
}
</style>