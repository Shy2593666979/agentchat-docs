import {
  flowRendererV2,
  flowStyles
} from "./chunk-2MP5HMMU.js";
import {
  flowDb,
  parser$1
} from "./chunk-KPJVYA4O.js";
import "./chunk-2YWIQDOI.js";
import "./chunk-OQEJNIZ2.js";
import "./chunk-SD6Y32FW.js";
import "./chunk-PJI24JH2.js";
import "./chunk-CS4OP3XV.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-YASOVY35.js";
import {
  __toESM
} from "./chunk-PR4QN5HX.js";

// node_modules/mermaid/dist/flowDiagram-v2-4f6560a1.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-4f6560a1-6FEOGGAS.js.map
