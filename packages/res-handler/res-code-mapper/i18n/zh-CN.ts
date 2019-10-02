import { CodeMapper } from "../../types/code-mapper-types";
import CodeMap from "../enum";

/** 这里做枚举定义的反射 */

const zhCNMapper: CodeMapper = {};

const _CodeMap: {
  [key: string]: number;
} = CodeMap;

Object.keys(_CodeMap).forEach(key => {
  const val = _CodeMap[key];
  zhCNMapper[val] = key;
});

export default zhCNMapper;
