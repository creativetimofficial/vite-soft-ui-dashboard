<template>
    <div class="popup-add-movie">
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-title">Thêm suất chiếu phim {{ nameMovie }}</div>
          <div class="popup-icon-close" @click="closeThisPopup()">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="popup-main">

          <div class="popup-row-1">
            <div class="popup-input popup-date">
              <label>Chọn ngày</label>
              <el-date-picker
                v-model="dataMovie.postDate"
                type="date"
                :placeholder="$t('PickADay')"
                :size="size"
                @change="checkHideTemplate"
              />
            </div>
          </div>
          <div class="popup-row-1" v-if="showTemplate">
            <div class="popup-input popup-date group-combobox">
              <label>Chọn giờ chiếu</label>
              <v-select
                label="time"
                :options="dataMovie.templateTime"
                :placeholder="$t('PTypeMovie')"
                v-model="dataMovie.selectTemplateCode"
                :reduce="(time) => time.templateTimeCode"
                multiple
              ></v-select>
            </div>
          </div>
        </div>
        <div class="popup-footer">
          <base-button
            :classButton="'button-white'"
            :titleButton="'Hủy'"
            @bindEvent="closeThisPopup()"
          ></base-button>
  
          <div class="ml-2"></div>
          <base-button
            :classButton="'button-blue'"
            :titleButton="'Thêm'"
            @click="postMovie()"
          ></base-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VsudInput from "../../components/VsudInput.vue";
  import BaseButton from "../components/BaseButton.vue";
  import BaseUpload from "../components/BaseUpload.vue";
  import BaseUploadFirebase from "../components/BaseUploadFirebase.vue";
  import { uuidv4 } from "../../common/uuid";
  import {convertDateTime} from "@/common/commonFunc.js";
  export default {
    emits: ["add-click"],
    components: {
      BaseButton,
      VsudInput,
      BaseUpload,
      BaseUploadFirebase,
    },
    created() {
    },
    props: {
        nameMovie:{
            type: String,
        },
        idMovie:{
            type: String
        }
    },
    data() {
      return {
        dataMovie: {
          postDate: "",
          todate: "",
          releasedate: "",
          templateTime: [],
          categoryMovie: [],
          selectTemplateCode: null,
          selectedCategory: null,
          content: null,
          movieCode: null,
          movieName: null,
          actor: null,
          direction: null,
          urlImage: null,
          linkTrailer: null,
          language: null,
        },
        showTemplate: false,
      };
    },
    methods: {
        checkHideTemplate(){
            let me =this;
            if(this.dataMovie.postDate){
               this.$api.post("/Movie/GetTemplateTimeCodeByMovieID",{movieID:me.idMovie,postDate: convertDateTime(me.dataMovie.postDate) }).then(data=>{
                me.dataMovie.templateTime = data;
                if(me.dataMovie.templateTime.length ==0){
                    me.dataMovie.selectTemplateCode = null;
                }
                me.showTemplate = true;
               })
            }else{
                me.showTemplate = false;
            }
        }
    },
  };
  </script>
  
  <style lang="scss">
  @import "vue-select/dist/vue-select.css";
  .popup-add-movie {
    input::placeholder {
      font-size: 13px;
      color: #c8cace;
    }
    .form-control {
      height: 40px;
    }
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    .popup-container {
      height: 600px;
      width: 900px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .popup-header {
        height: 60px;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 18px 0;
        background: #ddefff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .popup-title {
          font-weight: 700;
          font-size: 18px;
          color: #111;
        }
        .popup-icon-close {
          position: absolute;
          top: 10px;
          right: 10px;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
      }
  
      .popup-footer {
        height: 60px;
        padding: 0 18px 0;
        display: flex;
        background: #ddefff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .ml-2 {
          margin-left: 10px;
        }
      }
  
      .popup-main {
        height: 480px;
        padding: 0 18px 0;
        .popup-input {
          padding: 0 8px 0;
        }
        .pt-25 {
          padding-top: 25px;
        }
        .popup-row-1 {
          display: flex;
          .form-control {
            padding-left: 0.75rem !important;
          }
          .el-input__wrapper {
            border-radius: 10px !important;
          }
  
          .el-input--prefix {
            margin-bottom: 1rem;
          }
  
          .el-input {
            height: 40px !important;
          }
  
          .popup-date {
            width: 250px !important;
          }
        }
        #movie_content {
          max-height: 100px;
          width: 200px;
          height: 100px;
        }
  
        #trailer-link {
          width: 600px;
        }
  
        .group-combobox{
          margin: auto 0;
        }
      }
    }
  }
  </style>
  