import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';
import './index.less';
import AliyunOSSUpload from '../AliyunOSSUpload';
import 'braft-editor/dist/index.css';
import { Button } from 'antd';
export default class PageDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(this.props.content ?? null),
  };

  render() {
    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
    ];
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <AliyunOSSUpload accept="image/*" insertImg={this.insertImg} showUploadList={false}>
            <Button className="control-item button upload-button" data-title="插入图片">
              上传图片
            </Button>
          </AliyunOSSUpload>
        ),
      },
    ];
    return (
      <div className="editor">
        <BraftEditor
          value={this.state.editorState}
          onChange={this.handleChange}
          controls={controls}
          extendControls={extendControls}
        />
      </div>
    );
  }

  handleChange = (editorState) => {
    this.setState({ editorState });
    // 编辑器空判断,为空不过表单验证
    if (!editorState.isEmpty()) {
      // 将编辑器输入的内容传递回表单组建
      let content = editorState.toHTML();

      this.props.setDetails(content);
    } else {
      this.props.setDetails('');
    }
  };

  insertImg = (url) => {
    console.log('a', url);
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: 'IMAGE',
          url: url,
        },
      ]),
    });
  };
}
