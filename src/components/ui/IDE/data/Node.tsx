import React, { FC } from 'react';
import { NodeApi, TreeApi } from 'react-arborist';
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown, MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
// 필요한 아이콘들을 import
import { DiJavascript1, DiReact, DiPython, DiCplusplus } from 'react-icons/di';
import {
  SiCss3,
  SiHtml5,
  SiJson,
  SiMarkdown,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { LiaJava } from 'react-icons/lia';
// DiC 아이콘을 대신할 적절한 아이콘을 찾아 import하세요.

interface MyNodeData {
  id: string;
  name: string;
  icon?: React.ElementType;
  iconColor?: string;
  children?: MyNodeData[];
}

interface NodeProps {
  node: NodeApi<MyNodeData>;
  style: React.CSSProperties;
  dragHandle: React.Ref<HTMLDivElement>;
  tree: TreeApi<MyNodeData>;
}

const Node: FC<NodeProps> = ({ node, style, dragHandle, tree }) => {
  // 확장자에 따른 아이콘을 반환하는 함수

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'js':
        return <DiJavascript1 color="#f0db4f" />;
      case 'jsx':
        return <DiReact color="#61DBFB" />;
      case 'ts':
        return <SiTypescript color="#3178c6" />;
      case 'tsx':
        return <DiReact color="#61DBFB" />;
      case 'py':
        return <DiPython color="#3776AB" />;
      case 'c':
        return <TbBrandCpp color="#A8B9CC" />;
      case 'cpp':
        return <TbBrandCpp color="#004482" />;
      case 'html':
        return <SiHtml5 color="#E34F26" />;
      case 'css':
        return <SiCss3 color="#1572B6" />;
      case 'json':
        return <SiJson color="#A8B9CC" />;
      case 'md':
        return <SiMarkdown color="#E34F26" />;
      case 'java':
        return <LiaJava color="#f89820" />; // Java 파일 아이콘
      default:
        return <AiFillFile color="#6bc7f6" />;
    }
  };

  // 파일 확장자를 기반으로 아이콘 선택
  const IconComponent = node.isLeaf ? (
    getFileIcon(node.data.name)
  ) : (
    <AiFillFolder color="#f6cf60" />
  );

  const FolderArrowIcon = node.isInternal ? (
    node.isOpen ? (
      <MdArrowDropDown />
    ) : (
      <MdArrowRight />
    )
  ) : (
    <span className="pl-3"> </span>
  );

  const nodeStyle = node.isLeaf ? 'file-node' : 'folder-node';

  const handleNodeClick = () => {
    console.log('Node:', node); // 현재 노드 객체 출력 (디버깅용
    console.log('Node ID:', node.data.id); // 현재 노드의 ID 출력
    console.log('Node Name:', node.data.name); // 현재 노드의 이름 출력
    console.log('Node Data:', node.data); // 현재 노드의 데이터 출력
    console.log(node.parent?.data); // 부모 노드의 데이터 출력 (부모 ID가 있는 경우)
    // console.log(node.)
    if (node.isInternal) {
      node.toggle(); // 내부 노드인 경우, 열기/닫기 토글
    }
  };

  return (
    <div
      className={`node-container ${nodeStyle} ${node.state.isSelected ? 'isSelected' : ''}`}
      style={style}
      ref={dragHandle}
    >
      <div className="node-content" onClick={() => handleNodeClick()}>
        <span className="arrow-icon">{FolderArrowIcon}</span>
        <span className="file-folder-icon">{IconComponent}</span>
        <span className="node-text">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === 'Escape') node.reset();
                if (e.key === 'Enter') node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>

      <div className="file-actions">
        <div className="folderFileActions">
          <button onClick={() => node.edit()} title="Rename...">
            <MdEdit />
          </button>
          <button onClick={() => tree.delete(node.id)} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Node;
