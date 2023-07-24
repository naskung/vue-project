<template>
    <MobileLayout>
      <div class ='detail-title1'>
          <h3>input</h3>
          <a-form-model-item style="margin-bottom: 0">
              <a-input
                class="No"
                size="large"
                placeholder="XXXXXXX"
                :max-length="10"
              />
            </a-form-model-item>
      </div>
      <div class ='detail-title1'>
        <h4>switch</h4>
        <a-switch v-model:checked="checked"  />
      </div >
      <div class ='detail-title1'>
        <h4>Radio Button</h4>
        <a-radio-group v-model:value="value" name="radioGroup">
          <a-radio value="1">A</a-radio>
          <a-radio value="2">B</a-radio>
          <a-radio value="3">C</a-radio>
          <a-radio value="4">D</a-radio>
        </a-radio-group>
      </div>
      <div class ='detail-title1'>
        <h4>Input Number</h4>
        <a-space>
          <a-input-number v-model:value="value1" size="large" :min="1" :max="100000" />
          <a-input-number v-model:value="value2" :min="1" :max="100000" />
          <a-input-number v-model:value="value3" size="small" :min="1" :max="100000" />
       </a-space>
      </div>
      <div class ='detail-title1'>
        <h4>upload</h4>
        <a-upload
          v-model:file-list="fileList"
          name="file"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </div>
    </MobileLayout>
</template>

<script  lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';

const checked = ref<boolean>(false);
const value = ref<string>('1');
const value1 = ref<number>(3);
const value2 = ref<number>(4);
const value3 = ref<number>(5);

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const fileList = ref([]);
const headers = {
  authorization: 'authorization-text',
};

    
</script>

<style scoped>
.detail-title1{
 margin-top: 20px;
 margin: 10px;
}
</style>