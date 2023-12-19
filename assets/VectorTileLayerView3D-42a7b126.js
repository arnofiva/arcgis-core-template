import{tC as Le,tL as He,b5 as Ue,tG as Ae,au as We,aP as ze,kn as he,gt as Be,lH as Ge,at as Je,nS as ee,bl as Ke,u9 as ke,ua as Ye,ub as je,sG as le,sd as L,uc as Y,ud as ce,ue as de,uf as Xe,ug as ae,uh as Qe,nY as Ze,ci as et,ay as tt,dR as it,ui as nt,rK as st,uj as ot,uk as at,tK as j,ed as fe,k0 as V,nm as F,oB as rt,oC as lt,ul as ct,ol as H,um as ut,un as ht,sa as A,oz as Oe,sb as K,jr as oe,cJ as _e,as as dt,uo as ft,up as _t,db as mt,aH as pt,aN as gt,aQ as yt,am as me,ah as q,ai as B,ak as vt}from"./index-8b5e7d9b.js";import{t as $}from"./Rect-98da58d6.js";import{r as xt}from"./pbf-97a34880.js";import{e as wt}from"./rasterizingUtils-13352f0c.js";import{r as bt}from"./vec4f32-0d1b2306.js";import{e as k,t as Ne,r as pe}from"./definitions-5359da6f.js";import{T as W}from"./enums-9d4f5c11.js";import{M as ne}from"./number-e491b09e.js";import{c as ge}from"./GeometryUtils-0258f920.js";import{l as ye}from"./StyleRepository-9854daae.js";import{n as St}from"./LayerView3D-239175ff.js";import{o as Tt}from"./TiledLayerView3D-791dea7d.js";import{u as Pt}from"./LayerView-840504cd.js";import"./TileClipper-ae6eca9e.js";let It=class{constructor(e,i,t){this._scale=e,this._shift=i,this._levelShift=t}getLevelRowColumn(e){const i=this.getLevelShift(e[0]),t=this._shift+i;return t?[e[0]-i,e[1]>>t,e[2]>>t]:e}getLevelShift(e){return Math.min(e,this._levelShift)}getOffset(e,i){let t=0,n=0;const s=this._shift+this.getLevelShift(e[0]);if(s){const o=(1<<s)-1,a=i/(this._scale*(1<<s-1));t=(e[2]&o)*a,n=(e[1]&o)*a}return[t,n]}getScale(e){return this._scale*(1<<this._shift+this.getLevelShift(e))}},ie=class{constructor(e,i){this._width=0,this._height=0,this._free=[],this._width=e,this._height=i,this._free.push(new $(0,0,e,i))}get width(){return this._width}get height(){return this._height}allocate(e,i){if(e>this._width||i>this._height)return new $;let t=null,n=-1;for(let s=0;s<this._free.length;++s){const o=this._free[s];e<=o.width&&i<=o.height&&(t===null||o.y<=t.y&&o.x<=t.x)&&(t=o,n=s)}return t===null?new $:(this._free.splice(n,1),t.width<t.height?(t.width>e&&this._free.push(new $(t.x+e,t.y,t.width-e,i)),t.height>i&&this._free.push(new $(t.x,t.y+i,t.width,t.height-i))):(t.width>e&&this._free.push(new $(t.x+e,t.y,t.width-e,t.height)),t.height>i&&this._free.push(new $(t.x,t.y+i,e,t.height-i))),new $(t.x,t.y,e,i))}release(e){for(let i=0;i<this._free.length;++i){const t=this._free[i];if(t.y===e.y&&t.height===e.height&&t.x+t.width===e.x)t.width+=e.width;else if(t.x===e.x&&t.width===e.width&&t.y+t.height===e.y)t.height+=e.height;else if(e.y===t.y&&e.height===t.height&&e.x+e.width===t.x)t.x=e.x,t.width+=e.width;else{if(e.x!==t.x||e.width!==t.width||e.y+e.height!==t.y)continue;t.y=e.y,t.height+=e.height}this._free.splice(i,1),this.release(e)}this._free.push(e)}},ve=class{constructor(e,i,t){this.width=0,this.height=0,this._dirties=[],this._glyphData=[],this._currentPage=0,this._glyphIndex={},this._textures=[],this._rangePromises=new Map,this.width=e,this.height=i,this._glyphSource=t,this._binPack=new ie(e-4,i-4),this._glyphData.push(new Uint8Array(e*i)),this._dirties.push(!0),this._textures.push(void 0)}getGlyphItems(e,i){const t=[],n=this._glyphSource,s=new Set,o=1/256;for(const r of i){const l=Math.floor(r*o);s.add(l)}const a=[];return s.forEach(r=>{const l=e+r;if(this._rangePromises.has(l))a.push(this._rangePromises.get(l));else{const h=n.getRange(e,r).then(()=>{this._rangePromises.delete(l)},()=>{this._rangePromises.delete(l)});this._rangePromises.set(l,h),a.push(h)}}),Promise.all(a).then(()=>{let r=this._glyphIndex[e];r||(r={},this._glyphIndex[e]=r);for(const l of i){const h=r[l];if(h){t[l]={sdf:!0,rect:h.rect,metrics:h.metrics,page:h.page,code:l};continue}const d=n.getGlyph(e,l);if(!d?.metrics)continue;const f=d.metrics;let c;if(f.width===0)c=new $(0,0,0,0);else{const _=f.width+6,m=f.height+2*3;let g=_%4?4-_%4:4,y=m%4?4-m%4:4;g===1&&(g=5),y===1&&(y=5),c=this._binPack.allocate(_+g,m+y),c.isEmpty&&(this._dirties[this._currentPage]||(this._glyphData[this._currentPage]=null),this._currentPage=this._glyphData.length,this._glyphData.push(new Uint8Array(this.width*this.height)),this._dirties.push(!0),this._textures.push(void 0),this._binPack=new ie(this.width-4,this.height-4),c=this._binPack.allocate(_+g,m+y));const P=this._glyphData[this._currentPage],I=d.bitmap;let v,S;if(I)for(let x=0;x<m;x++){v=_*x,S=this.width*(c.y+x+1)+c.x;for(let w=0;w<_;w++)P[S+w+1]=I.at(v+w)}}r[l]={rect:c,metrics:f,tileIDs:null,page:this._currentPage},t[l]={sdf:!0,rect:c,metrics:f,page:this._currentPage,code:l},this._dirties[this._currentPage]=!0}return t})}removeGlyphs(e){for(const i in this._glyphIndex){const t=this._glyphIndex[i];if(!t)continue;let n;for(const s in t)if(n=t[s],n.tileIDs.delete(e),n.tileIDs.size===0){const o=this._glyphData[n.page],a=n.rect;let r,l;for(let h=0;h<a.height;h++)for(r=this.width*(a.y+h)+a.x,l=0;l<a.width;l++)o[r+l]=0;delete t[s],this._dirties[n.page]=!0}}}bind(e,i,t,n=0){if(!this._textures[t]){const o=new Le;o.pixelFormat=He.ALPHA,o.wrapMode=Ue.CLAMP_TO_EDGE,o.width=this.width,o.height=this.height,this._textures[t]=new Ae(e,o,new Uint8Array(this.width*this.height))}const s=this._textures[t];s.setSamplingMode(i),this._dirties[t]&&s.setData(this._glyphData[t]),e.bindTexture(s,n),this._dirties[t]=!1}destroy(){this.dispose()}dispose(){this._glyphData.length=0,this._binPack=null;for(const e of this._textures)e&&e.dispose();this._textures.length=0}},re=class{constructor(e){if(this._metrics=[],!e)return void(this._allBitmaps=null);const i=new Map;let t=0;for(;e.next();)switch(e.tag()){case 1:{const o=e.getMessage();for(;o.next();)switch(o.tag()){case 3:{const a=o.getMessage();let r,l,h,d,f,c,p;for(;a.next();)switch(a.tag()){case 1:r=a.getUInt32();break;case 2:l=a.getBytes();break;case 3:h=a.getUInt32();break;case 4:d=a.getUInt32();break;case 5:f=a.getSInt32();break;case 6:c=a.getSInt32();break;case 7:p=a.getUInt32();break;default:a.skip()}if(a.release(),r){const _=l?.length??0;this._metrics[r]={width:h,height:d,left:f,top:c,advance:p,startOffset:t,length:_},i.set(r,l),t+=_}break}default:o.skip()}o.release();break}default:e.skip()}const n=new Uint8Array(t),s=this._metrics;for(const[o,a]of i){const{startOffset:r,length:l}=s[o];if(a)for(let h=0;h<l;++h)n[r+h]=a[h]}this._allBitmaps=n}getMetrics(e){return this._metrics[e]}getBitmap(e){if(!this._allBitmaps)return;const i=this._metrics[e];if(i===void 0)return;const{startOffset:t,length:n}=i;return n!==0?new Rt(this._allBitmaps,t,n):void 0}},Mt=class{constructor(){this._ranges=[]}get ranges(){return this._ranges}getRange(e){return this._ranges[e]}addRange(e,i){this._ranges[e]=i}},xe=class{constructor(e){this._glyphInfo={},this._baseURL=e}getRange(e,i){const t=this._getFontStack(e);if(t.getRange(i))return Promise.resolve();const n=256*i,s=n+255;if(this._baseURL){const o=this._baseURL.replace("{fontstack}",e).replace("{range}",n+"-"+s);return We(o,{responseType:"array-buffer"}).then(a=>{t.addRange(i,new re(new xt(new Uint8Array(a.data),new DataView(a.data))))}).catch(()=>{t.addRange(i,new re)})}return t.addRange(i,new re),Promise.resolve()}getGlyph(e,i){const t=this._getFontStack(e);if(!t)return;const n=Math.floor(i/256),s=t.getRange(n);return s?{metrics:s.getMetrics(i),bitmap:s.getBitmap(i)}:void 0}_getFontStack(e){let i=this._glyphInfo[e];return i||(i=this._glyphInfo[e]=new Mt),i}},Rt=class{constructor(e,i,t){this._array=e,this._start=i,this.length=t}at(e){return 0<=e&&e<this.length?this._array[this._start+e]:void 0}};const Dt="dasharray-";let we=class $e{constructor(e,i,t=0){this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,(e<=0||i<=0)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=e,this._pageHeight=i,t>0&&(this._maxItemSize=t),this._binPack=new ie(e-4,i-4)}destroy(){this.dispose()}dispose(){this._binPack=null,this._mosaicsData.length=0,this._mosaicRects={};for(const e of this._textures)e&&e.dispose();this._textures.length=0}getWidth(e){return e>=this._size.length?-1:this._size[e][0]}getHeight(e){return e>=this._size.length?-1:this._size[e][1]}getPageSize(e){return e>=this._size.length?null:this._size[e]}setSpriteSource(e){if(this.dispose(),this.pixelRatio=e.devicePixelRatio,this._mosaicsData.length===0){this._binPack=new ie(this._pageWidth-4,this._pageHeight-4);const i=Math.floor(this._pageWidth),t=Math.floor(this._pageHeight),n=new Uint32Array(i*t);this._mosaicsData[0]=n,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=e}getSpriteItem(e,i=!1){let t,n,s=this._mosaicRects[e];if(s)return s;if(!this._sprites||this._sprites.loadStatus!=="loaded"||(e&&e.startsWith(Dt)?([t,n]=this._rasterizeDash(e),i=!0):t=this._sprites.getSpriteInfo(e),!t?.width||!t.height||t.width<0||t.height<0))return null;const o=t.width,a=t.height,[r,l,h]=this._allocateImage(o,a);return r.width<=0?null:(this._copy(r,t,l,h,i,n),s={rect:r,width:o,height:a,sdf:t.sdf,simplePattern:!1,pixelRatio:t.pixelRatio,page:l},this._mosaicRects[e]=s,s)}getSpriteItems(e){const i={};for(const t of e)i[t.name]=this.getSpriteItem(t.name,t.repeat);return i}getMosaicItemPosition(e,i){const t=this.getSpriteItem(e,i),n=t&&t.rect;if(!n)return null;n.width=t.width,n.height=t.height;const s=t.width,o=t.height,a=2;return{tl:[n.x+a,n.y+a],br:[n.x+a+s,n.y+a+o],page:t.page}}bind(e,i,t=0,n=0){if(t>=this._size.length||t>=this._mosaicsData.length)return;if(!this._textures[t]){const o=new Le;o.wrapMode=Ue.CLAMP_TO_EDGE,o.width=this._size[t][0],o.height=this._size[t][1],this._textures[t]=new Ae(e,o,new Uint8Array(this._mosaicsData[t].buffer))}const s=this._textures[t];s.setSamplingMode(i),this._dirties[t]&&s.setData(new Uint8Array(this._mosaicsData[t].buffer)),e.bindTexture(s,n),this._dirties[t]=!1}static _copyBits(e,i,t,n,s,o,a,r,l,h,d){let f=n*i+t,c=r*o+a;if(d){c-=o;for(let p=-1;p<=h;p++,f=((p+h)%h+n)*i+t,c+=o)for(let _=-1;_<=l;_++)s[c+_]=e[f+(_+l)%l]}else for(let p=0;p<h;p++){for(let _=0;_<l;_++)s[c+_]=e[f+_];f+=i,c+=o}}_copy(e,i,t,n,s,o){if(!this._sprites||this._sprites.loadStatus!=="loaded"||t>=this._mosaicsData.length)return;const a=new Uint32Array(o?o.buffer:this._sprites.image.buffer),r=this._mosaicsData[t];r&&a||console.error("Source or target images are uninitialized!");const l=2,h=o?i.width:this._sprites.width;$e._copyBits(a,h,i.x,i.y,r,n[0],e.x+l,e.y+l,i.width,i.height,s),this._dirties[t]=!0}_allocateImage(e,i){e+=2,i+=2;const t=Math.max(e,i);if(this._maxItemSize&&this._maxItemSize<t){const a=new $(0,0,e,i);return this._mosaicsData.push(new Uint32Array(e*i)),this._dirties.push(!0),this._size.push([e,i]),this._textures.push(void 0),[a,this._mosaicsData.length-1,[e,i]]}let n=e%4?4-e%4:4,s=i%4?4-i%4:4;n===1&&(n=5),s===1&&(s=5);const o=this._binPack.allocate(e+n,i+s);return o.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new ie(this._pageWidth-4,this._pageHeight-4),this._allocateImage(e,i)):[o,this._currentPage,[this._pageWidth,this._pageHeight]]}_rasterizeDash(e){const i=/\[(.*?)\]/,t=e.match(i);if(!t)return null;const n=t[1].split(",").map(Number),s=e.slice(e.lastIndexOf("-")+1),[o,a,r]=wt(n,s);return[{x:0,y:0,width:a,height:r,sdf:!0,pixelRatio:1},new Uint8Array(o.buffer)]}},Ct=class{constructor(e,i,t){this._layer=e,this._styleRepository=i,this.devicePixelRatio=t,this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null,this._spriteSourceAbortController=null,this._startOptionsInputSignal=null,this._inputSignalEventListener=null}destroy(){this._connection?.close(),this._connection=null,this._styleRepository=null,this._layer=null,this._spriteMosaic?.destroy(),this._spriteMosaic=null,this._glyphMosaic=null,this._spriteSourceAbortController=ze(this._spriteSourceAbortController),this._spriteSourcePromise=null,this._inputSignalEventListener&&this._startOptionsInputSignal?.removeEventListener("abort",this._inputSignalEventListener),this._startOptionsInputSignal=null,this._inputSignalEventListener=null}get spriteMosaic(){return this._spriteSourcePromise.then(()=>this._spriteMosaic)}get glyphMosaic(){return this._glyphMosaic}async start(e){this._requestSprite(e);const i=this._layer.currentStyleInfo.glyphsUrl,t=new xe(i?he(i,{...this._layer.customParameters,token:this._layer.apiKey}):null);this._glyphMosaic=new ve(1024,1024,t),this._broadcastPromise=Be("WorkerTileHandler",{client:this,schedule:e.schedule,signal:e.signal}).then(n=>{if(this._layer&&(this._connection?.close(),this._connection=n,this._layer&&!this._connection.closed)){const s=n.broadcast("setStyle",this._layer.currentStyleInfo.style,e);Promise.all(s).catch(o=>Ge(o))}})}_requestSprite(e){this._spriteSourceAbortController?.abort();const i=new AbortController;this._spriteSourceAbortController=i;const t=e?.signal;this._inputSignalEventListener&&this._startOptionsInputSignal?.removeEventListener("abort",this._inputSignalEventListener),this._startOptionsInputSignal=null,t&&(this._inputSignalEventListener=Et(i),t.addEventListener("abort",this._inputSignalEventListener,{once:!0}));const{signal:n}=i,s={...e,signal:n};this._spriteSourcePromise=this._layer.loadSpriteSource(this.devicePixelRatio,s),this._spriteSourcePromise.then(o=>{Je(n),this._spriteMosaic=new we(1024,1024,250),this._spriteMosaic.setSpriteSource(o)})}async updateStyle(e){return await this._broadcastPromise,this._broadcastPromise=Promise.all(this._connection.broadcast("updateStyle",e)),this._broadcastPromise}setSpriteSource(e){const i=new we(1024,1024,250);return i.setSpriteSource(e),this._spriteMosaic=i,this._spriteSourcePromise=Promise.resolve(e),this._spriteSourceAbortController=null,i}async setStyle(e,i){await this._broadcastPromise,this._styleRepository=e,this._requestSprite();const t=new xe(this._layer.currentStyleInfo.glyphsUrl?he(this._layer.currentStyleInfo.glyphsUrl,{...this._layer.customParameters,token:this._layer.apiKey}):null);return this._glyphMosaic=new ve(1024,1024,t),this._broadcastPromise=Promise.all(this._connection.broadcast("setStyle",i)),this._broadcastPromise}fetchTileData(e,i){return this._getRefKeys(e,i).then(t=>{const n=this._layer.sourceNameToSource,s=[];for(const o in n)s.push(o);return this._getSourcesData(s,t,i)})}parseTileData(e,i){const t=e&&e.data;if(!t)return Promise.resolve(null);const{sourceName2DataAndRefKey:n,transferList:s}=t;return Object.keys(n).length===0?Promise.resolve(null):this._broadcastPromise.then(()=>this._connection.invoke("createTileAndParse",{key:e.key.id,sourceName2DataAndRefKey:n,styleLayerUIDs:e.styleLayerUIDs},{...i,transferList:s}))}async getSprites(e){return await this._spriteSourcePromise,this._spriteMosaic.getSpriteItems(e)}getGlyphs(e){return this._glyphMosaic.getGlyphItems(e.font,e.codePoints)}async _getTilePayload(e,i,t){const n=ee.pool.acquire(e.id),s=this._layer.sourceNameToSource[i],{level:o,row:a,col:r}=n;ee.pool.release(n);try{return{protobuff:await s.requestTile(o,a,r,t),sourceName:i}}catch(l){if(Ke(l))throw l;return{protobuff:null,sourceName:i}}}_getRefKeys(e,i){const t=this._layer.sourceNameToSource,n=new Array;for(const s in t){const o=t[s].getRefKey(e,i);n.push(o)}return Promise.allSettled(n)}_getSourcesData(e,i,t){const n=[];for(let s=0;s<i.length;s++){const o=i[s],a=o.status==="fulfilled"?o.value:null;if(a==null||e[s]==null)n.push(null);else{const r=this._getTilePayload(a,e[s],t);n.push(r)}}return Promise.allSettled(n).then(s=>{const o={},a=[];for(let r=0;r<s.length;r++){const l=s[r],h=l.status==="fulfilled"?l.value:null,d=h?.protobuff;if(!h||!d?.byteLength)continue;const f=i[r],c=f.status==="fulfilled"?f.value:null;if(c){const p=c.id;o[h.sourceName]={refKey:p,protobuff:d},a.push(d)}}return{sourceName2DataAndRefKey:o,transferList:a}})}};function Et(u){return()=>u.abort()}function Lt(u,e,i,t,n,s){const{iconRotationAlignment:o,textRotationAlignment:a,iconTranslate:r,iconTranslateAnchor:l,textTranslate:h,textTranslateAnchor:d}=t;let f=0;for(const c of u.colliders){const[p,_]=c.partIndex===0?r:h,m=c.partIndex===0?l:d,g=c.minLod<=s&&s<=c.maxLod;f+=g?0:1,c.enabled=g,c.xScreen=c.xTile*n[0]+c.yTile*n[3]+n[6],c.yScreen=c.xTile*n[1]+c.yTile*n[4]+n[7],m===Y.MAP?(c.xScreen+=i*p-e*_,c.yScreen+=e*p+i*_):(c.xScreen+=p,c.yScreen+=_),L.VIEWPORT===(c.partIndex===0?o:a)?(c.dxScreen=c.dxPixels,c.dyScreen=c.dyPixels):(c.dxScreen=i*(c.dxPixels+c.width/2)-e*(c.dyPixels+c.height/2)-c.width/2,c.dyScreen=e*(c.dxPixels+c.width/2)+i*(c.dyPixels+c.height/2)-c.height/2)}u.colliders.length>0&&f===u.colliders.length&&(u.unique.show=!1)}let Ut=class{constructor(e,i,t,n,s,o){this._symbols=e,this._styleRepository=n,this._zoom=s,this._currentLayerCursor=0,this._currentSymbolCursor=0,this._styleProps=new Map,this._allNeededMatrices=new Map,this._gridIndex=new ke(i,t,Ye),this._si=Math.sin(Math.PI*o/180),this._co=Math.cos(Math.PI*o/180);for(const a of e)for(const r of a.symbols)this._allNeededMatrices.has(r.tile)||this._allNeededMatrices.set(r.tile,je(r.tile.transforms.tileUnitsToPixels))}work(e){const i=this._gridIndex;function t(s){const o=s.xScreen+s.dxScreen,a=s.yScreen+s.dyScreen,r=o+s.width,l=a+s.height,[h,d,f,c]=i.getCellSpan(o,a,r,l);for(let p=d;p<=c;p++)for(let _=h;_<=f;_++){const m=i.cells[p][_];for(const g of m){const y=g.xScreen+g.dxScreen,P=g.yScreen+g.dyScreen,I=y+g.width,v=P+g.height;if(!(r<y||o>I||l<P||a>v))return!0}}return!1}const n=performance.now();for(;this._currentLayerCursor<this._symbols.length;this._currentLayerCursor++,this._currentSymbolCursor=0){const s=this._symbols[this._currentLayerCursor],o=this._getProperties(s.styleLayerUID);for(;this._currentSymbolCursor<s.symbols.length;this._currentSymbolCursor++){if(this._currentSymbolCursor%100==99&&performance.now()-n>e)return!1;const a=s.symbols[this._currentSymbolCursor];if(!a.unique.show)continue;Lt(a,this._si,this._co,o,this._allNeededMatrices.get(a.tile),this._zoom);const r=a.unique;if(!r.show)continue;const{iconAllowOverlap:l,iconIgnorePlacement:h,textAllowOverlap:d,textIgnorePlacement:f}=o;for(const c of a.colliders){if(!c.enabled)continue;const p=r.parts[c.partIndex];p.show&&!(c.partIndex?d:l)&&t(c)&&(c.hard?r.show=!1:p.show=!1)}if(r.show)for(const c of a.colliders){if(!c.enabled||(c.partIndex?f:h)||!r.parts[c.partIndex].show)continue;const p=c.xScreen+c.dxScreen,_=c.yScreen+c.dyScreen,m=p+c.width,g=_+c.height,[y,P,I,v]=this._gridIndex.getCellSpan(p,_,m,g);for(let S=P;S<=v;S++)for(let x=y;x<=I;x++)this._gridIndex.cells[S][x].push(c)}}}return!0}_getProperties(e){const i=this._styleProps.get(e);if(i)return i;const t=this._zoom,n=this._styleRepository.getStyleLayerByUID(e),s=n.getLayoutValue("symbol-placement",t)!==le.POINT;let o=n.getLayoutValue("icon-rotation-alignment",t);o===L.AUTO&&(o=s?L.MAP:L.VIEWPORT);let a=n.getLayoutValue("text-rotation-alignment",t);a===L.AUTO&&(a=s?L.MAP:L.VIEWPORT);const r=n.getPaintValue("icon-translate",t),l=n.getPaintValue("icon-translate-anchor",t),h=n.getPaintValue("text-translate",t),d=n.getPaintValue("text-translate-anchor",t),f={iconAllowOverlap:n.getLayoutValue("icon-allow-overlap",t),iconIgnorePlacement:n.getLayoutValue("icon-ignore-placement",t),textAllowOverlap:n.getLayoutValue("text-allow-overlap",t),textIgnorePlacement:n.getLayoutValue("text-ignore-placement",t),iconRotationAlignment:o,textRotationAlignment:a,iconTranslateAnchor:l,iconTranslate:r,textTranslateAnchor:d,textTranslate:h};return this._styleProps.set(e,f),f}};function At(u,e){if(u.priority-e.priority)return u.priority-e.priority;const i=u.tile.key,t=e.tile.key;return i.world-t.world?i.world-t.world:i.level-t.level?i.level-t.level:i.row-t.row?i.row-t.row:i.col-t.col?i.col-t.col:u.xTile-e.xTile?u.xTile-e.xTile:u.yTile-e.yTile}let zt=class{get running(){return this._running}constructor(e,i,t,n,s,o){this._visibleTiles=e,this._symbolRepository=i,this._createCollisionJob=t,this._assignTileSymbolsOpacity=n,this._symbolLayerSorter=s,this._isLayerVisible=o,this._selectionJob=null,this._selectionJobCompleted=!1,this._collisionJob=null,this._collisionJobCompleted=!1,this._opacityJob=null,this._opacityJobCompleted=!1,this._running=!0}setScreenSize(e,i){this._screenWidth===e&&this._screenHeight===i||this.restart(),this._screenWidth=e,this._screenHeight=i}restart(){this._selectionJob=null,this._selectionJobCompleted=!1,this._collisionJob=null,this._collisionJobCompleted=!1,this._opacityJob=null,this._opacityJobCompleted=!1,this._running=!0}continue(e){if(this._selectionJob||(this._selectionJob=this._createSelectionJob()),!this._selectionJobCompleted){const i=performance.now();if(!this._selectionJob.work(e)||(this._selectionJobCompleted=!0,(e=Math.max(0,e-(performance.now()-i)))===0))return!1}if(this._collisionJob||(this._collisionJob=this._createCollisionJob(this._selectionJob.sortedSymbols,this._screenWidth,this._screenHeight)),!this._collisionJobCompleted){const i=performance.now();if(!this._collisionJob.work(e)||(this._collisionJobCompleted=!0,(e=Math.max(0,e-(performance.now()-i)))===0))return!1}if(this._opacityJob||(this._opacityJob=this._createOpacityJob()),!this._opacityJobCompleted){const i=performance.now();if(!this._opacityJob.work(e)||(this._opacityJobCompleted=!0,(e=Math.max(0,e-(performance.now()-i)))===0))return!1}return this._running=!1,!0}_createSelectionJob(){const e=this._symbolRepository.uniqueSymbols;for(let r=0;r<e.length;r++){const l=e[r];for(let h=0;h<l.uniqueSymbols.length;h++){const d=l.uniqueSymbols[h];for(const f of d.tileSymbols)f.selectedForRendering=!1}}const i=[];let t=0,n=0;const s=this._isLayerVisible;function o(r){let l;const h=performance.now();for(;n<e.length;n++,t=0){const d=e[n],f=d.styleLayerUID;if(!s(f)){i[n]||(i[n]={styleLayerUID:f,symbols:[]});continue}i[n]=i[n]||{styleLayerUID:f,symbols:[]};const c=i[n];for(;t<d.uniqueSymbols.length;t++){if(l=d.uniqueSymbols[t],t%100==99&&performance.now()-h>r)return!1;let p=null,_=!1,m=!1;for(const g of l.tileSymbols)if(!m||!_){const y=g.tile;(!p||y.isCoverage||y.neededForCoverage&&!_)&&(p=g,(y.neededForCoverage||y.isCoverage)&&(m=!0),y.isCoverage&&(_=!0))}if(p.selectedForRendering=!0,m){c.symbols.push(p),l.show=!0;for(const g of l.parts)g.show=!0}else l.show=!1}}for(const d of i)d.symbols.sort(At);return!0}const a=this._symbolLayerSorter;return{work:o,get sortedSymbols(){return i.sort(a)}}}_createOpacityJob(){const e=this._assignTileSymbolsOpacity,i=this._visibleTiles;let t=0;function n(s,o){const a=s.symbols;for(const[r,l]of a)kt(l,o);e(s,o);for(const r of s.childrenTiles)n(r,o)}return{work(s){const o=performance.now();for(;t<i.length;t++){if(performance.now()-o>s)return!1;const a=i[t];a.parentTile==null&&n(a,performance.now())}return!0}}}};function kt(u,e){for(const i of u){const t=i.unique;for(const n of t.parts){const s=n.targetOpacity>.5?1:-1;n.startOpacity+=s*((e-n.startTime)/ce),n.startOpacity=Math.min(Math.max(n.startOpacity,0),1),n.startTime=e,n.targetOpacity=t.show&&n.show?1:0}}}const Ot=32,Nt=8,$t=64;let Vt=class{constructor(e,i,t){this.tileCoordRange=e,this._visibleTiles=i,this._createUnique=t,this._tiles=new Map,this._uniqueSymbolsReferences=new Map}get uniqueSymbols(){return this._uniqueSymbolLayerArray==null&&(this._uniqueSymbolLayerArray=this._createUniqueSymbolLayerArray()),this._uniqueSymbolLayerArray}add(e,i){this._uniqueSymbolLayerArray=null;let t=this._tiles.get(e.id);t||(t={symbols:new Map},this._tiles.set(e.id,t));const n=new Map;if(i)for(const a of i)t.symbols.has(a)&&(n.set(a,t.symbols.get(a)),t.symbols.delete(a));else for(const[a,r]of e.layerData)t.symbols.has(a)&&(n.set(a,t.symbols.get(a)),t.symbols.delete(a));this._removeSymbols(n);const s=e.symbols,o=new Map;for(const[a,r]of s){let l=r.length;if(l>=Ot){let h=this.tileCoordRange;do h/=2,l/=4;while(l>Nt&&h>$t);const d=new ke(this.tileCoordRange,this.tileCoordRange,h);o.set(a,{flat:r,index:d}),t.symbols.set(a,{flat:r,index:d});for(const f of r)d.getCell(f.xTile,f.yTile).push(f)}else o.set(a,{flat:r}),t.symbols.set(a,{flat:r})}this._addSymbols(e.key,s)}deleteStyleLayers(e){this._uniqueSymbolLayerArray=null;for(const[i,t]of this._tiles){const n=new Map;for(const s of e)t.symbols.has(s)&&(n.set(s,t.symbols.get(s)),t.symbols.delete(s));this._removeSymbols(n),t.symbols.size===0&&this._tiles.delete(i)}}removeTile(e){this._uniqueSymbolLayerArray=null;const i=this._tiles.get(e.id);if(!i)return;const t=new Map;for(const[n,s]of e.symbols)i.symbols.has(n)&&(t.set(n,i.symbols.get(n)),i.symbols.delete(n));this._removeSymbols(t),i.symbols.size===0&&this._tiles.delete(e.id)}_removeSymbols(e){for(const[i,{flat:t}]of e)for(const n of t){const s=n.unique,o=s.tileSymbols,a=o.length-1;for(let r=0;r<a;r++)if(o[r]===n){o[r]=o[a];break}if(o.length=a,a===0){const r=this._uniqueSymbolsReferences.get(i);r.delete(s),r.size===0&&this._uniqueSymbolsReferences.delete(i)}n.unique=null}}_addSymbols(e,i){if(i.size===0)return;const t=this._visibleTiles;for(const n of t)n.parentTile||n.key.world!==e.world||n.key.level===e.level&&!n.key.equals(e)||this._matchSymbols(n,e,i);for(const[n,s]of i)for(const o of s)if(o.unique==null){const a=this._createUnique();o.unique=a,a.tileSymbols.push(o);let r=this._uniqueSymbolsReferences.get(n);r||(r=new Set,this._uniqueSymbolsReferences.set(n,r)),r.add(a)}}_matchSymbols(e,i,t){if(e.key.level>i.level){const s=e.key.level-i.level;if(e.key.row>>s!==i.row||e.key.col>>s!==i.col)return}if(i.level>e.key.level){const s=i.level-e.key.level;if(i.row>>s!==e.key.row||i.col>>s!==e.key.col)return}if(i.equals(e.key)){for(const s of e.childrenTiles)this._matchSymbols(s,i,t);return}const n=new Map;for(const[s,o]of t){const a=[];for(const d of o){const f=de(this.tileCoordRange,d.xTile,i.level,i.col,e.key.level,e.key.col),c=de(this.tileCoordRange,d.yTile,i.level,i.row,e.key.level,e.key.row);f>=0&&f<this.tileCoordRange&&c>=0&&c<this.tileCoordRange&&a.push({symbol:d,xTransformed:f,yTransformed:c})}const r=[],l=e.key.level<i.level?1:1<<e.key.level-i.level,h=this._tiles.get(e.id).symbols.get(s);if(h){const d=h.flat;for(const f of a){let c,p=!1;const _=f.xTransformed,m=f.yTransformed;c=h.index!=null?h.index.getCell(_,m):d;const g=f.symbol,y=g.hash;for(const P of c)if(y===P.hash&&Math.abs(_-P.xTile)<=l&&Math.abs(m-P.yTile)<=l){const I=P.unique;g.unique=I,I.tileSymbols.push(g),p=!0;break}p||r.push(g)}}r.length>0&&n.set(s,r)}for(const s of e.childrenTiles)this._matchSymbols(s,i,n)}_createUniqueSymbolLayerArray(){const e=this._uniqueSymbolsReferences,i=new Array(e.size);let t,n=0;for(const[s,o]of e){const a=new Array(o.size);t=0;for(const r of o)a[t++]=r;i[n]={styleLayerUID:s,uniqueSymbols:a},n++}return i}};function Ft(u){const e=[],i=new Vt(4096,e,()=>{const n=new Qe;return n.show=!1,n.parts.push({startTime:0,startOpacity:0,targetOpacity:0,show:!1}),n.parts.push({startTime:0,startOpacity:0,targetOpacity:0,show:!1}),n}),t=new zt(e,i,(n,s,o)=>new Ut(n,s,o,u.styleRepository,u.key.level,0),(n,s)=>{Xe(n,s,!1)},()=>0,n=>{const s=u.styleRepository.getStyleLayerByUID(n).getLayoutProperty("visibility");return!s||s.getValue()!==ae.NONE});e.push(u),i.add(u),t.setScreenSize(512,512),t.continue(1/0)}let qt=class extends Ze{constructor(){super(...arguments),this._fullCacheLodInfos=null,this._levelByScale={}}getTileParentId(e){const i=ee.pool.acquire(e),t=i.level===0?null:ee.getId(i.level-1,i.row>>1,i.col>>1,i.world);return ee.pool.release(i),t}getTileCoverage(e,i,t=!0,n){const s=super.getTileCoverage(e,i,t,n);if(!s)return s;const o=1<<s.lodInfo.level;return s.spans=s.spans.filter(a=>a.row>=0&&a.row<o),s}scaleToLevel(e){if(this._fullCacheLodInfos||this._initializeFullCacheLODs(this._lodInfos),this._levelByScale[e])return this._levelByScale[e];{const i=this._fullCacheLodInfos;if(e>i[0].scale)return i[0].level;let t,n;for(let s=0;s<i.length-1;s++)if(n=i[s+1],e>n.scale)return t=i[s],t.level+(t.scale-e)/(t.scale-n.scale);return i[i.length-1].level}}_initializeFullCacheLODs(e){let i;if(e[0].level===0)i=e.map(t=>({level:t.level,resolution:t.resolution,scale:t.scale}));else{const t=this.tileInfo.size[0],n=this.tileInfo.spatialReference;i=et.create({size:t,spatialReference:n}).lods.map(s=>({level:s.level,resolution:s.resolution,scale:s.scale}))}for(let t=0;t<i.length;t++)this._levelByScale[i[t].scale]=i[t].level;this._fullCacheLodInfos=i}},be=class extends Ct{constructor(e,i,t,n){super(e,i,t),this._memCache=n,this._ongoingTileRequests=new Map,this._ongoingRequestToController=new Map,this._tileInfoView=new qt(e.tileInfo,e.fullExtent)}destroy(){super.destroy(),this._ongoingRequestToController.forEach(e=>e.abort()),this._ongoingRequestToController.clear(),this._ongoingTileRequests.clear()}async getVectorTile(e,i,t,n){const s=new ee(e,i,t,0);let o=this._memCache.get(s.id);if(o!=null)return o.retain(),o;const a=await this._getVectorTileData(s);if(tt(n),!this._layer)return null;if(o=this._memCache.get(s.id),o!=null)return o.retain(),o;const r=this._layer.tileInfo.getTileBounds(it(),s),l=this._tileInfoView.getTileResolution(e);return o=new nt(s,l,r[0],r[3],512,512,this._styleRepository,this._memCache),a?(o.setData(a),o.retain(),this._memCache.put(s.id,o,o.memoryUsed,st)):o.setData(null),o.neededForCoverage=!0,o.transforms.tileUnitsToPixels=ot(1/8,0,0,0,1/8,0,0,0,1),Ft(o),o}_getVectorTileData(e){const i=e.id;if(this._ongoingTileRequests.has(i))return this._ongoingTileRequests.get(i);const t=new AbortController,n={signal:t.signal},s=this._getParsedVectorTileData(e,n).then(o=>(this._ongoingTileRequests.delete(i),this._ongoingRequestToController.delete(i),o)).catch(()=>(this._ongoingTileRequests.delete(i),this._ongoingRequestToController.delete(i),null));return this._ongoingTileRequests.set(i,s),this._ongoingRequestToController.set(i,t),s}_getParsedVectorTileData(e,i){return this.fetchTileData(e,i).then(t=>this.parseTileData({key:e,data:t},i))}},se=class{constructor(){this.name=this.constructor.name||"UnnamedBrush",this.brushEffect=null}prepareState(e,i){}draw(e,i,t){}drawMany(e,i,t){for(const n of i)n.visible&&this.draw(e,n,t)}},Ht=class extends se{constructor(){super(...arguments),this._color=bt(1,0,0,1),this._patternMatrix=at(),this._programOptions={id:!1,pattern:!1}}dispose(){this._vao&&(this._vao.dispose(),this._vao=null)}drawMany(e,i){const{context:t,painter:n,styleLayerUID:s,requestRender:o,allowDelayedRender:a}=e;this._loadWGLResources(e);const r=e.displayLevel,l=e.styleLayer,h=l.backgroundMaterial,d=n.vectorTilesMaterialManager,f=l.getPaintValue("background-color",r),c=l.getPaintValue("background-opacity",r),p=l.getPaintValue("background-pattern",r),_=p!==void 0,m=f[3]*c,g=1|window.devicePixelRatio,y=e.spriteMosaic;let P,I;const v=g>Ne?2:1,S=e.drawPhase===W.HITTEST,x=this._programOptions;x.id=S,x.pattern=_;const w=d.getMaterialProgram(t,h,x);if(!a||o==null||w.compiled){if(t.bindVAO(this._vao),t.useProgram(w),_){const T=y.getMosaicItemPosition(p,!0);if(T!=null){const{tl:M,br:b,page:D}=T;P=b[0]-M[0],I=b[1]-M[1];const R=y.getPageSize(D);R!=null&&(y.bind(t,j.LINEAR,D,k),w.setUniform4f("u_tlbr",M[0],M[1],b[0],b[1]),w.setUniform2fv("u_mosaicSize",R),w.setUniform1i("u_texture",k))}w.setUniform1f("u_opacity",c)}else this._color[0]=m*f[0],this._color[1]=m*f[1],this._color[2]=m*f[2],this._color[3]=m,w.setUniform4fv("u_color",this._color);if(w.setUniform1f("u_depth",l.z||0),S){const T=ne(s+1);w.setUniform4fv("u_id",T)}for(const T of i){if(w.setUniform1f("u_coord_range",T.rangeX),w.setUniformMatrix3fv("u_dvsMat3",T.transforms.dvs),_){const M=Math.max(2**(Math.round(r)-T.key.level),1),b=v*T.width*M,D=b/fe(P),R=b/fe(I);this._patternMatrix[0]=D,this._patternMatrix[4]=R,w.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix)}t.setStencilFunction(V.EQUAL,0,255),t.drawArrays(F.TRIANGLE_STRIP,0,4)}}else o()}_loadWGLResources(e){if(this._vao)return;const{context:i,styleLayer:t}=e,n=t.backgroundMaterial,s=new Int8Array([0,0,1,0,0,1,1,1]),o=rt.createVertex(i,lt.STATIC_DRAW,s),a=new ct(i,n.getAttributeLocations(),n.getLayoutInfo(),{geometry:o});this._vao=a}},Wt=class extends se{constructor(){super(...arguments),this._programOptions={id:!1}}dispose(){}drawMany(e,i){const{context:t,displayLevel:n,requiredLevel:s,state:o,drawPhase:a,painter:r,spriteMosaic:l,styleLayerUID:h,requestRender:d,allowDelayedRender:f}=e;if(!i.some(x=>x.layerData.get(h)?.circleIndexCount??!1))return;const c=e.styleLayer,p=c.circleMaterial,_=r.vectorTilesMaterialManager,m=1.2,g=c.getPaintValue("circle-translate",n),y=c.getPaintValue("circle-translate-anchor",n),P=a===W.HITTEST,I=this._programOptions;I.id=P;const v=_.getMaterialProgram(t,p,I);if(f&&d!=null&&!v.compiled)return void d();t.useProgram(v),v.setUniformMatrix3fv("u_displayMat3",y===Y.VIEWPORT?o.displayMat3:o.displayViewMat3),v.setUniform2fv("u_circleTranslation",g),v.setUniform1f("u_depth",c.z),v.setUniform1f("u_antialiasingWidth",m);let S=-1;if(P){const x=ne(h+1);v.setUniform4fv("u_id",x)}for(const x of i){if(!x.layerData.has(h))continue;x.key.level!==S&&(S=x.key.level,p.setDataUniforms(v,n,c,S,l));const w=x.layerData.get(h);if(!w.circleIndexCount)continue;w.prepareForRendering(t);const T=w.vao;T!=null&&(t.bindVAO(T),v.setUniformMatrix3fv("u_dvsMat3",x.transforms.dvs),s!==x.key.level?t.setStencilFunction(V.EQUAL,x.stencilRef,255):t.setStencilFunction(V.GREATER,255,255),t.drawElements(F.TRIANGLES,w.circleIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*w.circleIndexStart),x.triangleCount+=w.circleIndexCount/3)}}};const Se=1/65536;let Bt=class extends se{constructor(){super(...arguments),this._fillProgramOptions={id:!1,pattern:!1},this._outlineProgramOptions={id:!1}}dispose(){}drawMany(e,i){const{displayLevel:t,drawPhase:n,renderPass:s,spriteMosaic:o,styleLayerUID:a}=e;let r=!1;for(const v of i)if(v.layerData.has(a)){const S=v.layerData.get(a);if(S.fillIndexCount>0||S.outlineIndexCount>0){r=!0;break}}if(!r)return;const l=e.styleLayer,h=l.getPaintProperty("fill-pattern"),d=h!==void 0,f=d&&h.isDataDriven;let c;if(d&&!f){const v=h.getValue(t);c=o.getMosaicItemPosition(v,!0)}const p=!d&&l.getPaintValue("fill-antialias",t);let _=!0,m=1;if(!d){const v=l.getPaintProperty("fill-color"),S=l.getPaintProperty("fill-opacity");if(!v?.isDataDriven&&!S?.isDataDriven){const x=l.getPaintValue("fill-color",t);m=l.getPaintValue("fill-opacity",t)*x[3],m>=1&&(_=!1)}}if(_&&s==="opaque")return;let g;n===W.HITTEST&&(g=ne(a+1));const y=l.getPaintValue("fill-translate",t),P=l.getPaintValue("fill-translate-anchor",t);(_||s!=="translucent")&&this._drawFill(e,a,l,i,y,P,d,c,f,g);const I=!l.hasDataDrivenOutlineColor&&l.outlineUsesFillColor&&m<1;p&&s!=="opaque"&&!I&&this._drawOutline(e,a,l,i,y,P,g)}_drawFill(e,i,t,n,s,o,a,r,l,h){if(a&&!l&&r==null)return;const{context:d,displayLevel:f,state:c,drawPhase:p,painter:_,pixelRatio:m,spriteMosaic:g,requestRender:y,allowDelayedRender:P}=e,I=t.fillMaterial,v=_.vectorTilesMaterialManager,S=m>Ne?2:1,x=p===W.HITTEST,w=this._fillProgramOptions;w.id=x,w.pattern=a;const T=v.getMaterialProgram(d,I,w);if(P&&y!=null&&!T.compiled)return void y();if(d.useProgram(T),r!=null){const{page:b}=r,D=g.getPageSize(b);D!=null&&(g.bind(d,j.LINEAR,b,k),T.setUniform2fv("u_mosaicSize",D),T.setUniform1i("u_texture",k))}T.setUniformMatrix3fv("u_displayMat3",o===Y.VIEWPORT?c.displayMat3:c.displayViewMat3),T.setUniform2fv("u_fillTranslation",s),T.setUniform1f("u_depth",t.z+Se),x&&T.setUniform4fv("u_id",h);let M=-1;for(const b of n){if(!b.layerData.has(i))continue;b.key.level!==M&&(M=b.key.level,I.setDataUniforms(T,f,t,M,g));const D=b.layerData.get(i);if(!D.fillIndexCount)continue;D.prepareForRendering(d);const R=D.fillVAO;if(R!=null){if(d.bindVAO(R),T.setUniformMatrix3fv("u_dvsMat3",b.transforms.dvs),d.setStencilFunction(V.EQUAL,b.stencilRef,255),a){const U=Math.max(2**(Math.round(f)-b.key.level),1),E=b.rangeX/(S*b.width*U);T.setUniform1f("u_patternFactor",E)}if(l){const U=D.patternMap;if(!U)continue;for(const[E,G]of U){const J=g.getPageSize(E);J!=null&&(g.bind(d,j.LINEAR,E,k),T.setUniform2fv("u_mosaicSize",J),T.setUniform1i("u_texture",k),d.drawElements(F.TRIANGLES,G[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*G[0]))}}else d.drawElements(F.TRIANGLES,D.fillIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*D.fillIndexStart);b.triangleCount+=D.fillIndexCount/3}}}_drawOutline(e,i,t,n,s,o,a){const{context:r,displayLevel:l,state:h,drawPhase:d,painter:f,pixelRatio:c,spriteMosaic:p,requestRender:_,allowDelayedRender:m}=e,g=t.outlineMaterial,y=f.vectorTilesMaterialManager,P=.75/c,I=d===W.HITTEST,v=this._outlineProgramOptions;v.id=I;const S=y.getMaterialProgram(r,g,v);if(m&&_!=null&&!S.compiled)return void _();r.useProgram(S),S.setUniformMatrix3fv("u_displayMat3",o===Y.VIEWPORT?h.displayMat3:h.displayViewMat3),S.setUniform2fv("u_fillTranslation",s),S.setUniform1f("u_depth",t.z+Se),S.setUniform1f("u_outline_width",P),I&&S.setUniform4fv("u_id",a);let x=-1;for(const w of n){if(!w.layerData.has(i))continue;w.key.level!==x&&(x=w.key.level,g.setDataUniforms(S,l,t,x,p));const T=w.layerData.get(i);if(T.prepareForRendering(r),!T.outlineIndexCount)continue;const M=T.outlineVAO;M!=null&&(r.bindVAO(M),S.setUniformMatrix3fv("u_dvsMat3",w.transforms.dvs),r.setStencilFunction(V.EQUAL,w.stencilRef,255),r.drawElements(F.TRIANGLES,T.outlineIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*T.outlineIndexStart),w.triangleCount+=T.outlineIndexCount/3)}}},Gt=class extends se{constructor(){super(...arguments),this._programOptions={id:!1,pattern:!1,sdf:!1}}dispose(){}drawMany(e,i){const{context:t,displayLevel:n,state:s,drawPhase:o,painter:a,pixelRatio:r,spriteMosaic:l,styleLayerUID:h,requestRender:d,allowDelayedRender:f}=e;if(!i.some(R=>R.layerData.get(h)?.lineIndexCount??!1))return;const c=e.styleLayer,p=c.lineMaterial,_=a.vectorTilesMaterialManager,m=c.getPaintValue("line-translate",n),g=c.getPaintValue("line-translate-anchor",n),y=c.getPaintProperty("line-pattern"),P=y!==void 0,I=P&&y.isDataDriven;let v,S;if(P&&!I){const R=y.getValue(n);v=l.getMosaicItemPosition(R)}let x=!1;if(!P){const R=c.getPaintProperty("line-dasharray");if(S=R!==void 0,x=S&&R.isDataDriven,S&&!x){const U=R.getValue(n),E=c.getDashKey(U,c.getLayoutValue("line-cap",n));v=l.getMosaicItemPosition(E)}}const w=1/r,T=o===W.HITTEST,M=this._programOptions;M.id=T,M.pattern=P,M.sdf=S;const b=_.getMaterialProgram(t,p,M);if(f&&d!=null&&!b.compiled)return void d();if(t.useProgram(b),b.setUniformMatrix3fv("u_displayViewMat3",s.displayViewMat3),b.setUniformMatrix3fv("u_displayMat3",g===Y.VIEWPORT?s.displayMat3:s.displayViewMat3),b.setUniform2fv("u_lineTranslation",m),b.setUniform1f("u_depth",c.z),b.setUniform1f("u_antialiasing",w),T){const R=ne(h+1);b.setUniform4fv("u_id",R)}if(v&&v!=null){const{page:R}=v,U=l.getPageSize(R);U!=null&&(l.bind(t,j.LINEAR,R,k),b.setUniform2fv("u_mosaicSize",U),b.setUniform1i("u_texture",k))}let D=-1;for(const R of i){if(!R.layerData.has(h))continue;R.key.level!==D&&(D=R.key.level,p.setDataUniforms(b,n,c,D,l));const U=2**(n-D)/r;b.setUniform1f("u_zoomFactor",U);const E=R.layerData.get(h);if(!E.lineIndexCount)continue;E.prepareForRendering(t);const G=E.vao;if(G!=null){if(t.bindVAO(G),b.setUniformMatrix3fv("u_dvsMat3",R.transforms.dvs),t.setStencilFunction(V.EQUAL,R.stencilRef,255),I||x){const J=E.patternMap;if(!J)continue;for(const[te,C]of J){const Q=l.getPageSize(te);Q!=null&&(l.bind(t,j.LINEAR,te,k),b.setUniform2fv("u_mosaicSize",Q),b.setUniform1i("u_texture",k),t.drawElements(F.TRIANGLES,C[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*C[0]))}}else t.drawElements(F.TRIANGLES,E.lineIndexCount,H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*E.lineIndexStart);R.triangleCount+=E.lineIndexCount/3}}}};const Jt=1/65536;class Kt extends se{constructor(){super(...arguments),this._iconProgramOptions={id:!1,sdf:!1},this._sdfProgramOptions={id:!1},this._spritesTextureSize=ut()}dispose(){}drawMany(e,i){const{drawPhase:t,styleLayerUID:n}=e,s=e.styleLayer;let o;t===W.HITTEST&&(o=ne(n+1)),this._drawIcons(e,s,i,o),this._drawText(e,s,i,o)}_drawIcons(e,i,t,n){const{context:s,displayLevel:o,drawPhase:a,painter:r,spriteMosaic:l,state:h,styleLayerUID:d,requestRender:f,allowDelayedRender:c}=e,p=i.iconMaterial,_=r.vectorTilesMaterialManager;let m,g=!1;for(const D of t)if(D.layerData.has(d)&&(m=D.layerData.get(d),m.iconPerPageElementsMap.size>0)){g=!0;break}if(!g)return;const y=i.getPaintValue("icon-translate",o),P=i.getPaintValue("icon-translate-anchor",o);let I=i.getLayoutValue("icon-rotation-alignment",o);I===L.AUTO&&(I=i.getLayoutValue("symbol-placement",o)===le.POINT?L.VIEWPORT:L.MAP);const v=I===L.MAP,S=i.getLayoutValue("icon-keep-upright",o)&&v,x=m.isIconSDF,w=a===W.HITTEST,T=this._iconProgramOptions;T.id=w,T.sdf=x;const M=_.getMaterialProgram(s,p,T);if(c&&f!=null&&!M.compiled)return void f();s.useProgram(M),M.setUniformMatrix3fv("u_displayViewMat3",I===L.MAP?h.displayViewMat3:h.displayMat3),M.setUniformMatrix3fv("u_displayMat3",P===Y.VIEWPORT?h.displayMat3:h.displayViewMat3),M.setUniform2fv("u_iconTranslation",y),M.setUniform1f("u_depth",i.z),M.setUniform1f("u_mapRotation",ge(h.rotation)),M.setUniform1f("u_keepUpright",S?1:0),M.setUniform1f("u_level",10*o),M.setUniform1i("u_texture",k),M.setUniform1f("u_fadeDuration",ce/1e3),w&&M.setUniform4fv("u_id",n);let b=-1;for(const D of t){if(!D.layerData.has(d)||(D.key.level!==b&&(b=D.key.level,p.setDataUniforms(M,o,i,b,l)),m=D.layerData.get(d),m.iconPerPageElementsMap.size===0))continue;m.prepareForRendering(s),m.updateOpacityInfo();const R=m.iconVAO;if(R!=null){s.bindVAO(R),M.setUniformMatrix3fv("u_dvsMat3",D.transforms.dvs),M.setUniform1f("u_time",(performance.now()-m.lastOpacityUpdate)/1e3);for(const[U,E]of m.iconPerPageElementsMap)this._renderIconRange(e,M,E,U,D)}}}_renderIconRange(e,i,t,n,s){const{context:o,spriteMosaic:a}=e;this._spritesTextureSize[0]=a.getWidth(n)/4,this._spritesTextureSize[1]=a.getHeight(n)/4,i.setUniform2fv("u_mosaicSize",this._spritesTextureSize),a.bind(o,j.LINEAR,n,k),this._setStencilState(e,s),o.drawElements(F.TRIANGLES,t[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*t[0]),s.triangleCount+=t[1]/3}_drawText(e,i,t,n){const{context:s,displayLevel:o,drawPhase:a,glyphMosaic:r,painter:l,pixelRatio:h,spriteMosaic:d,state:f,styleLayerUID:c,requestRender:p,allowDelayedRender:_}=e,m=i.textMaterial,g=l.vectorTilesMaterialManager;let y,P=!1;for(const N of t)if(N.layerData.has(c)&&(y=N.layerData.get(c),y.glyphPerPageElementsMap.size>0)){P=!0;break}if(!P)return;const I=i.getPaintProperty("text-opacity");if(I&&!I.isDataDriven&&I.getValue(o)===0)return;const v=i.getPaintProperty("text-color"),S=!v||v.isDataDriven||v.getValue(o)[3]>0,x=i.getPaintProperty("text-halo-width"),w=i.getPaintProperty("text-halo-color"),T=(!x||x.isDataDriven||x.getValue(o)>0)&&(!w||w.isDataDriven||w.getValue(o)[3]>0);if(!S&&!T)return;const M=24/8;let b=i.getLayoutValue("text-rotation-alignment",o);b===L.AUTO&&(b=i.getLayoutValue("symbol-placement",o)===le.POINT?L.VIEWPORT:L.MAP);const D=b===L.MAP,R=i.getLayoutValue("text-keep-upright",o)&&D,U=a===W.HITTEST,E=.8*M/h;this._glyphTextureSize||(this._glyphTextureSize=ht(r.width/4,r.height/4));const G=i.getPaintValue("text-translate",o),J=i.getPaintValue("text-translate-anchor",o),te=this._sdfProgramOptions;te.id=U;const C=g.getMaterialProgram(s,m,te);if(_&&p!=null&&!C.compiled)return void p();s.useProgram(C),C.setUniformMatrix3fv("u_displayViewMat3",b===L.MAP?f.displayViewMat3:f.displayMat3),C.setUniformMatrix3fv("u_displayMat3",J===Y.VIEWPORT?f.displayMat3:f.displayViewMat3),C.setUniform2fv("u_textTranslation",G),C.setUniform1f("u_depth",i.z+Jt),C.setUniform2fv("u_mosaicSize",this._glyphTextureSize),C.setUniform1f("u_mapRotation",ge(f.rotation)),C.setUniform1f("u_keepUpright",R?1:0),C.setUniform1f("u_level",10*o),C.setUniform1i("u_texture",pe),C.setUniform1f("u_antialiasingWidth",E),C.setUniform1f("u_fadeDuration",ce/1e3),U&&C.setUniform4fv("u_id",n);let Q=-1;for(const N of t){if(!N.layerData.has(c)||(N.key.level!==Q&&(Q=N.key.level,m.setDataUniforms(C,o,i,Q,d)),y=N.layerData.get(c),y.glyphPerPageElementsMap.size===0))continue;y.prepareForRendering(s),y.updateOpacityInfo();const ue=y.textVAO;if(ue==null)continue;s.bindVAO(ue),C.setUniformMatrix3fv("u_dvsMat3",N.transforms.dvs),this._setStencilState(e,N);const Ve=(performance.now()-y.lastOpacityUpdate)/1e3;C.setUniform1f("u_time",Ve),y.glyphPerPageElementsMap.forEach((Fe,qe)=>{this._renderGlyphRange(s,Fe,qe,r,C,T,S,N)})}}_renderGlyphRange(e,i,t,n,s,o,a,r){n.bind(e,j.LINEAR,t,pe),o&&(s.setUniform1f("u_halo",1),e.drawElements(F.TRIANGLES,i[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),r.triangleCount+=i[1]/3),a&&(s.setUniform1f("u_halo",0),e.drawElements(F.TRIANGLES,i[1],H.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),r.triangleCount+=i[1]/3)}_setStencilState(e,i){const{context:t,is3D:n,stencilSymbols:s}=e;if(t.setStencilTestEnabled(!0),s)return t.setStencilWriteMask(255),void t.setStencilFunction(V.ALWAYS,i.stencilRef,255);t.setStencilWriteMask(0),n?t.setStencilFunction(V.EQUAL,i.stencilRef,255):t.setStencilFunction(V.GREATER,255,255)}}const Yt={vtlBackground:Ht,vtlFill:Bt,vtlLine:Gt,vtlCircle:Wt,vtlSymbol:Kt},jt={background:{"background.frag":`#ifdef PATTERN
uniform lowp float u_opacity;
uniform lowp sampler2D u_texture;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_tileTextureCoord;
#else
uniform lowp vec4 u_color;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
void main() {
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = u_opacity * color;
#else
gl_FragColor = u_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"background.vert":`precision mediump float;
attribute vec2 a_pos;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform mediump float u_coord_range;
uniform mediump float u_depth;
#ifdef PATTERN
uniform mediump mat3 u_pattern_matrix;
varying mediump vec2 v_tileTextureCoord;
uniform mediump vec4 u_tlbr;
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
#endif
void main() {
gl_Position = vec4((u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0)).xy, u_depth, 1.0);
#ifdef PATTERN
v_tileTextureCoord = (u_pattern_matrix * vec3(a_pos, 1.0)).xy;
v_tlbr             = u_tlbr / u_mosaicSize.xyxy;
#endif
#ifdef ID
v_id = u_id / 255.0;
#endif
}`},circle:{"circle.frag":`precision lowp float;
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
mediump float dist = length(v_offset);
mediump float alpha = smoothstep(0.0, -v_blur, dist - 1.0);
lowp float color_mix_ratio = v_stroke_width < 0.01 ? 0.0 : smoothstep(-v_blur, 0.0, dist - v_radius / (v_radius + v_stroke_width));
gl_FragColor = alpha * mix(v_color, v_stroke_color, color_mix_ratio);
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"circle.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_circleTranslation;
uniform mediump float u_depth;
uniform mediump float u_antialiasingWidth;
void main()
{
#pragma main
v_color = color * opacity;
v_stroke_color = stroke_color * stroke_opacity;
v_stroke_width = stroke_width;
v_radius = radius;
v_blur = max(blur, u_antialiasingWidth / (radius + stroke_width));
mediump vec2 offset = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);
v_offset = offset;
#ifdef ID
v_id = u_id / 255.0;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos * 0.5, 1.0) + u_displayMat3 * vec3((v_radius + v_stroke_width) * offset + u_circleTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},fill:{"fill.frag":`precision lowp float;
#ifdef PATTERN
uniform lowp sampler2D u_texture;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = fract(v_tileTextureCoord);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = v_color[3] * color;
#else
gl_FragColor = v_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"fill.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump float u_depth;
uniform mediump vec2 u_fillTranslation;
#ifdef PATTERN
#include <util/util.glsl>
uniform mediump vec2 u_mosaicSize;
uniform mediump float u_patternFactor;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef ID
v_id = u_id / 255.0;
#endif
#ifdef PATTERN
float patternWidth = nextPOT(tlbr.z - tlbr.x);
float patternHeight = nextPOT(tlbr.w - tlbr.y);
float scaleX = 1.0 / (patternWidth * u_patternFactor);
float scaleY = 1.0 / (patternHeight * u_patternFactor);
mat3 patterMat = mat3(scaleX, 0.0,    0.0,
0.0,    -scaleY, 0.0,
0.0,    0.0,    1.0);
v_tileTextureCoord = (patterMat * vec3(a_pos, 1.0)).xy;
v_tlbr             = tlbr / u_mosaicSize.xyxy;
#endif
vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},icon:{"icon.frag":`precision mediump float;
uniform lowp sampler2D u_texture;
#ifdef SDF
uniform lowp vec4 u_color;
uniform lowp vec4 u_outlineColor;
#endif
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
varying lowp vec4 v_color;
#ifdef SDF
varying mediump flaot v_halo_width;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
#include <util/encoding.glsl>
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef SDF
lowp vec4 fillPixelColor = v_color;
float d = rgba2float(texture2D(u_texture, v_tex)) - 0.5;
const float softEdgeRatio = 0.248062016;
float size = max(v_size.x, v_size.y);
float dist = d * softEdgeRatio * size;
fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);
if (v_halo_width > 0.25) {
lowp vec4 outlinePixelColor = u_outlineColor;
const float outlineLimitRatio = (16.0 / 86.0);
float clampedOutlineSize = softEdgeRatio * min(v_halo_width, outlineLimitRatio * max(v_size.x, v_size.y));
outlinePixelColor *= clamp(0.5 - (abs(dist) - clampedOutlineSize), 0.0, 1.0);
gl_FragColor = v_opacity * mixColors(fillPixelColor, outlinePixelColor);
}
else {
gl_FragColor = v_opacity * fillPixelColor;
}
#else
lowp vec4 texColor = texture2D(u_texture, v_tex);
gl_FragColor = v_opacity * texColor;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"icon.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
#ifdef SDF
varying mediump float v_halo_width;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_iconTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
const float C_OFFSET_PRECISION = 1.0 / 8.0;
const float C_256_TO_RAD = 3.14159265359 / 128.0;
const float C_DEG_TO_RAD = 3.14159265359 / 180.0;
const float tileCoordRatio = 1.0 / 8.0;
uniform highp float u_time;
void main()
{
#pragma main
v_color = color;
v_opacity = opacity;
#ifdef SDF
v_halo_width = halo_width;
#endif
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_opacity *= interpolatedOpacity;
mediump float a_angle         = a_levelInfo[1];
mediump float a_minLevel      = a_levelInfo[2];
mediump float a_maxLevel      = a_levelInfo[3];
mediump vec2 a_tex            = a_texAngleRange.xy;
mediump float delta_z = 0.0;
mediump float rotated = mod(a_angle + u_mapRotation, 256.0);
delta_z += (1.0 - step(u_keepUpright, 0.0)) * step(64.0, rotated) * (1.0 - step(192.0, rotated));
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_opacity, 0.0);
vec2 offset = C_OFFSET_PRECISION * a_vertexOffset;
v_size = abs(offset);
#ifdef SDF
offset = (120.0 / 86.0) * offset;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayViewMat3 * vec3(size * offset, 0.0) + u_displayMat3 * vec3(u_iconTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
#ifdef ID
v_id = u_id / 255.0;
#endif
v_tex = a_tex.xy / u_mosaicSize;
}`},line:{"line.frag":`precision lowp float;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
varying mediump float v_lineHalfWidth;
varying lowp vec4 v_color;
varying mediump float v_blur;
#if defined (PATTERN) || defined(SDF)
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
uniform sampler2D u_texture;
uniform mediump float u_antialiasing;
#endif
#ifdef SDF
#include <util/encoding.glsl>
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
mediump float fragDist = length(v_normal) * v_lineHalfWidth;
lowp float alpha = clamp((v_lineHalfWidth - fragDist) / v_blur, 0.0, 1.0);
#ifdef PATTERN
mediump float relativeTexX = fract(v_accumulatedDistance / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY = 0.5 + v_normal.y * v_lineHalfWidth / (v_patternSize.y * v_widthRatio);
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
lowp vec4 color = texture2D(u_texture, texCoord);
gl_FragColor = alpha * v_color[3] * color;
#elif defined(SDF)
mediump float relativeTexX = fract((v_accumulatedDistance * 0.5) / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY =  0.5 + 0.25 * v_normal.y;
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
mediump float d = rgba2float(texture2D(u_texture, texCoord)) - 0.5;
float dist = d * (v_lineHalfWidth + u_antialiasing / 2.0);
gl_FragColor = alpha * clamp(0.5 - dist, 0.0, 1.0) * v_color;
#else
gl_FragColor = alpha * v_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"line.vert":`precision mediump float;
attribute vec2 a_pos;
attribute vec4 a_extrude_offset;
attribute vec4 a_dir_normal;
attribute vec2 a_accumulatedDistance;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump float u_zoomFactor;
uniform mediump vec2 u_lineTranslation;
uniform mediump float u_antialiasing;
uniform mediump float u_depth;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
const float scale = 1.0 / 31.0;
const mediump float tileCoordRatio = 8.0;
#if defined (SDF)
const mediump float sdfPatternHalfWidth = 15.5;
#endif
#if defined (PATTERN) || defined(SDF)
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
#endif
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
varying mediump float v_lineHalfWidth;
varying mediump float v_blur;
void main()
{
#pragma main
v_color = color * opacity;
v_blur = blur + u_antialiasing;
v_normal = a_dir_normal.zw * scale;
#if defined (PATTERN) || defined(SDF)
v_tlbr          = tlbr / u_mosaicSize.xyxy;
v_patternSize   = vec2(tlbr.z - tlbr.x, tlbr.y - tlbr.w);
#if defined (PATTERN)
v_widthRatio = width / v_patternSize.y;
#else
v_widthRatio = width / sdfPatternHalfWidth / 2.0;
#endif
#endif
v_lineHalfWidth = (width + u_antialiasing) * 0.5;
mediump vec2 dir = a_dir_normal.xy * scale;
mediump vec2 offset_ = a_extrude_offset.zw * scale * offset;
mediump vec2 dist = v_lineHalfWidth * scale * a_extrude_offset.xy;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos + offset_ * tileCoordRatio / u_zoomFactor, 1.0) + u_displayViewMat3 * vec3(dist, 0.0) + u_displayMat3 * vec3(u_lineTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
#if defined (PATTERN) || defined(SDF)
v_accumulatedDistance = a_accumulatedDistance.x * u_zoomFactor / tileCoordRatio + dot(dir, dist + offset_);
#endif
#ifdef ID
v_id = u_id / 255.0;
#endif
}`},outline:{"outline.frag":`varying lowp vec4 v_color;
varying mediump vec2 v_normal;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
lowp float dist = abs(v_normal.y);
lowp float alpha = smoothstep(1.0, 0.0, dist);
gl_FragColor = alpha * v_color;
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"outline.vert":`attribute vec2 a_pos;
attribute vec2 a_offset;
attribute vec2 a_xnormal;
#pragma header
varying lowp vec4 v_color;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_fillTranslation;
uniform mediump float u_depth;
uniform mediump float u_outline_width;
varying lowp vec2 v_normal;
const float scale = 1.0 / 15.0;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef ID
v_id = u_id / 255.0;
#endif
v_normal = a_xnormal;
mediump vec2 dist = u_outline_width * scale * a_offset;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(dist + u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},text:{"text.frag":`uniform lowp sampler2D u_texture;
varying lowp vec2 v_tex;
varying lowp vec4 v_color;
varying mediump float v_edgeWidth;
varying mediump float v_edgeDistance;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
lowp float dist = texture2D(u_texture, v_tex).a;
mediump float alpha = smoothstep(v_edgeDistance - v_edgeWidth, v_edgeDistance + v_edgeWidth, dist);
gl_FragColor = alpha * v_color;
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"text.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
varying lowp vec4 v_color;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_textTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying lowp vec2 v_tex;
const float offsetPrecision = 1.0 / 8.0;
const mediump float edgePos = 0.75;
uniform mediump float u_antialiasingWidth;
varying mediump float v_edgeDistance;
varying mediump float v_edgeWidth;
uniform lowp float u_halo;
const float sdfFontScale = 1.0 / 24.0;
const float sdfPixel = 3.0;
uniform highp float u_time;
void main()
{
#pragma main
if (u_halo > 0.5)
{
v_color = halo_color * opacity;
halo_width *= sdfPixel;
halo_blur *= sdfPixel;
}
else
{
v_color = color * opacity;
halo_width = 0.0;
halo_blur = 0.0;
}
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_color *= interpolatedOpacity;
mediump float a_angle       = a_levelInfo[1];
mediump float a_minLevel    = a_levelInfo[2];
mediump float a_maxLevel    = a_levelInfo[3];
mediump vec2 a_tex          = a_texAngleRange.xy;
mediump float a_visMinAngle    = a_texAngleRange.z;
mediump float a_visMaxAngle    = a_texAngleRange.w;
mediump float delta_z = 0.0;
mediump float angle = mod(a_angle + u_mapRotation, 256.0);
if (a_visMinAngle < a_visMaxAngle)
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) + (1.0 - step(a_visMinAngle, angle)));
}
else
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) * (1.0 - step(a_visMinAngle, angle)));
}
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_color[3], 0.0);
v_tex = a_tex.xy / u_mosaicSize;
#ifdef ID
v_id = u_id / 255.0;
#endif
v_edgeDistance = edgePos - halo_width / size;
v_edgeWidth = (u_antialiasingWidth + halo_blur) / size;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + sdfFontScale * u_displayViewMat3 * vec3(offsetPrecision * size * a_vertexOffset, 0.0) + u_displayMat3 * vec3(u_textTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
}`},util:{"encoding.glsl":`const vec4 rgba2float_factors = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, rgba2float_factors);
}`,"util.glsl":`float nextPOT(in float x) {
return pow(2.0, ceil(log2(abs(x))));
}`}};let Xt=class{constructor(e){this._readFile=e}resolveIncludes(e){return this._resolve(e)}_resolve(e,i=new Map){if(i.has(e))return i.get(e);const t=this._read(e);if(!t)throw new Error(`cannot find shader file ${e}`);const n=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let s=n.exec(t);const o=[];for(;s!=null;)o.push({path:s[1],start:s.index,length:s[0].length}),s=n.exec(t);let a=0,r="";return o.forEach(l=>{r+=t.slice(a,l.start),r+=i.has(l.path)?"":this._resolve(l.path,i),a=l.start+l.length}),r+=t.slice(a),i.set(e,r),r}_read(e){return this._readFile(e)}};function Qt(u){let e=jt;return u.split("/").forEach(i=>{e&&(e=e[i])}),e}const Zt=new Xt(Qt);function z(u){return Zt.resolveIncludes(u)}function ei(u){const{options:e,value:i}=u;return typeof e[i]=="number"}function X(u){let e="";for(const i in u){const t=u[i];if(typeof t=="boolean")t&&(e+=`#define ${i}
`);else if(typeof t=="number")e+=`#define ${i} ${t.toFixed()}
`;else if(typeof t=="object")if(ei(t)){const{value:n,options:s,namespace:o}=t,a=o?`${o}_`:"";for(const r in s)e+=`#define ${a}${r} ${s[r].toFixed()}
`;e+=`#define ${i} ${a}${n}
`}else{const n=t.options;let s=0;for(const o in n)e+=`#define ${n[o]} ${(s++).toFixed()}
`;e+=`#define ${i} ${n[t.value]}
`}}return e}const Te=u=>X({ID:u.id,PATTERN:u.pattern}),ti={shaders:u=>({vertexShader:Te(u)+z("background/background.vert"),fragmentShader:Te(u)+z("background/background.frag")})},Pe=u=>X({ID:u.id}),ii={shaders:u=>({vertexShader:Pe(u)+z("circle/circle.vert"),fragmentShader:Pe(u)+z("circle/circle.frag")})},Ie=u=>X({ID:u.id,PATTERN:u.pattern}),ni={shaders:u=>({vertexShader:Ie(u)+z("fill/fill.vert"),fragmentShader:Ie(u)+z("fill/fill.frag")})},Me=u=>X({ID:u.id}),si={shaders:u=>({vertexShader:Me(u)+z("outline/outline.vert"),fragmentShader:Me(u)+z("outline/outline.frag")})},Re=u=>X({ID:u.id,SDF:u.sdf}),oi={shaders:u=>({vertexShader:Re(u)+z("icon/icon.vert"),fragmentShader:Re(u)+z("icon/icon.frag")})},De=u=>X({ID:u.id,PATTERN:u.pattern,SDF:u.sdf}),ai={shaders:u=>({vertexShader:De(u)+z("line/line.vert"),fragmentShader:De(u)+z("line/line.frag")})},Ce=u=>X({ID:u.id}),ri={shaders:u=>({vertexShader:Ce(u)+z("text/text.vert"),fragmentShader:Ce(u)+z("text/text.frag")})};let li=class{constructor(){this._programByKey=new Map}dispose(){this._programByKey.forEach(e=>e.dispose()),this._programByKey.clear()}getMaterialProgram(e,i,t){const n=i.key<<3|this._getMaterialOptionsValue(i.type,t);if(this._programByKey.has(n))return this._programByKey.get(n);const s=this._getProgramTemplate(i.type),{shaders:o}=s,{vertexShader:a,fragmentShader:r}=o(t),l=i.getShaderHeader(),h=i.getShaderMain(),d=a.replace("#pragma header",l).replace("#pragma main",h),f=e.programCache.acquire(d,r,i.getAttributeLocations());return this._programByKey.set(n,f),f}_getMaterialOptionsValue(e,i){switch(e){case A.BACKGROUND:{const t=i;return(t.pattern?1:0)<<1|(t.id?1:0)}case A.FILL:{const t=i;return(t.pattern?1:0)<<1|(t.id?1:0)}case A.OUTLINE:return i.id?1:0;case A.LINE:{const t=i;return(t.sdf?1:0)<<2|(t.pattern?1:0)<<1|(t.id?1:0)}case A.ICON:{const t=i;return(t.sdf?1:0)<<1|(t.id?1:0)}case A.CIRCLE:return i.id?1:0;case A.TEXT:return i.id?1:0;default:return 0}}_getProgramTemplate(e){switch(e){case A.BACKGROUND:return ti;case A.CIRCLE:return ii;case A.FILL:return ni;case A.ICON:return oi;case A.LINE:return ai;case A.OUTLINE:return si;case A.TEXT:return ri;default:return null}}};const Z=1e-6;class Ee{constructor(e,i){this.spriteMosaic=e,this.glyphMosaic=i,this._brushCache=new Map,this._vtlMaterialManager=new li}dispose(){this._brushCache&&(this._brushCache.forEach(e=>e.dispose()),this._brushCache=null),this._vtlMaterialManager=Oe(this._vtlMaterialManager),this.spriteMosaic.dispose(),this.glyphMosaic.dispose()}get vectorTilesMaterialManager(){return this._vtlMaterialManager}drawSymbols(e,i,t){const n=t.layers;e.renderPass="translucent";for(let s=0;s<n.length;s++){const o=n[s];if(o.type!==K.SYMBOL)continue;const a=o.getLayoutProperty("visibility");if(a&&a.getValue()===ae.NONE)continue;const r=e.displayLevel;o.minzoom!==void 0&&o.minzoom>r+Z||o.maxzoom!==void 0&&o.maxzoom<=r-Z||(e.styleLayerUID=o.uid,e.styleLayer=o,this._drawWithBrush(e,i,"vtlSymbol"))}}drawBackground(e,i,t){if(t.backgroundBucketIds.length===0)return;const{context:n,displayLevel:s,requiredLevel:o}=e;i.key.level=o,n.setBlendingEnabled(!0),n.setDepthTestEnabled(!1),n.setStencilTestEnabled(!1),e.renderPass="background",t.backgroundBucketIds.forEach(a=>{const r=t.getLayerById(a);if(r.type!==K.BACKGROUND)return;const l=r.getLayoutProperty("visibility");l&&l.getValue()===ae.NONE||r.minzoom!==void 0&&r.minzoom>s+Z||r.maxzoom!==void 0&&r.maxzoom<=s-Z||(e.styleLayerUID=r.uid,e.styleLayer=r,this._drawWithBrush(e,i,"vtlBackground"))})}drawTile(e,i,t,n){const{context:s}=e,o=t.layers;s.setBlendingEnabled(!1),s.setDepthTestEnabled(!0),s.setDepthWriteEnabled(!0),s.setDepthFunction(V.LEQUAL),e.renderPass="opaque";for(let a=o.length-1;a>=0;a--){const r=o[a];n!=null&&n!==r.type||this._renderStyleLayer(r,e,i,!1)}s.setDepthWriteEnabled(!1),s.setBlendingEnabled(!0),s.setBlendFunctionSeparate(oe.ONE,oe.ONE_MINUS_SRC_ALPHA,oe.ONE,oe.ONE_MINUS_SRC_ALPHA),e.renderPass="translucent";for(let a=0;a<o.length;a++){const r=o[a];n!=null&&n!==r.type||this._renderStyleLayer(r,e,i,!1)}s.setDepthTestEnabled(!1),s.bindVAO()}_renderStyleLayer(e,i,t,n){if(!(n||e&&t.layerData.has(e.uid)))return;const s=e.getLayoutProperty("visibility");if(s&&s.getValue()===ae.NONE)return;const{renderPass:o}=i;let a;switch(e.type){case K.BACKGROUND:if(o!=="background")return;a="vtlBackground";break;case K.FILL:if(o!=="opaque"&&i.renderPass!=="translucent")return;a="vtlFill";break;case K.LINE:if(o!=="translucent")return;a="vtlLine";break;case K.CIRCLE:if(o!=="translucent")return;a="vtlCircle";break;case K.SYMBOL:if(o!=="translucent")return;a="vtlSymbol"}const r=i.displayLevel;if(e.minzoom!==void 0&&e.minzoom>r+Z||e.maxzoom!==void 0&&e.maxzoom<=r-Z)return;const{context:l}=i;l.setStencilTestEnabled(!1),l.setStencilWriteMask(0),i.styleLayerUID=e.uid,i.styleLayer=e,this._drawWithBrush(i,t,a)}_drawWithBrush(e,i,t){if(!this._brushCache.has(t)){const n=Yt[t];this._brushCache.set(t,new n)}this._brushCache.get(t).drawMany(e,[i])}}let O=class extends Tt(St(Pt)){constructor(){super(...arguments),this._tileHandlerController=null,this.type="vector-tile-3d",this.levelShift=_e("disable-feature:vtl-level-shift")?0:1}initialize(){if(this.layer.fullExtent==null)return void this.addResolvingPromise(Promise.reject(new dt("vectortilelayerview:full-extent-undefined","This layer view's layer does not define a fullExtent.")));const{basemapTerrain:u,spatialReference:e,state:i,viewingMode:t}=this.view,n=t==="local"&&!ft(e)||_t.force512VTL,s=this.layer.tileInfo.spatialReference.isGeographic,o=n?this.layer.tileInfo:this.layer.tileInfo.getOrCreateCompatible(256,s?1:2),a=this._getTileInfoSupportError(o,this.layer.fullExtent);if(a!=null)return this.addResolvingPromise(Promise.reject(a));const r=mt(()=>this.view?.basemapTerrain?.tilingSchemeLocked).then(()=>{const m=u.tilingScheme,g=m.pixelSize,y=g===256?1:2,P=u.spatialReference?.isGeographic&&g===256?1:0,I=u.spatialReference?.isGeographic||g!==256?0:1;let v;if(this.schemaHelper=new It(y,P,this.levelShift+I),g===256){const x=this.layer.tileInfo.spatialReference.isGeographic;v=this.layer.tileInfo.getOrCreateCompatible(256,x?1:2)}else v=this.view.spatialReference?.isGeographic?this.layer.tileInfo.getOrCreateCompatible(512,.5):this.layer.tileInfo;const S=this._getTileInfoCompatibilityError(v,m);if(S)throw S;this.tileInfo=v});this._tileHandlerController=new AbortController;const l=this.view.resourceController;this._memCache=l.memoryController.newCache(`vtl-${this.layer.uid}`,m=>{m.release()}),this.addHandles(pt(()=>this.view.qualitySettings.memoryLimit,m=>this._memCache.maxSize=Math.ceil(m/10*1048576),gt));const h=new ye(this.layer.currentStyleInfo.style);this._tileHandler=new be(this.layer,h,i.contentPixelRatio,this._memCache);const d=this._tileHandlerController.signal,f=ci(l),c=this._tileHandler.start({signal:d,schedule:f}),p=this._tileHandler.spriteMosaic;p.then(m=>{!yt(d)&&this._tileHandler&&(this.painter=new Ee(m,this._tileHandler.glyphMosaic))}),c.then(()=>this._tileHandlerController=null),this._updatingHandles.add(()=>({style:this.layer.currentStyleInfo.style,pixelRatio:this.view.state?.contentPixelRatio}),({style:m,pixelRatio:g})=>{this._tileHandlerController&&this._tileHandlerController.abort(),this._tileHandlerController=new AbortController,this._memCache.clear();const y=new ye(m),P=new be(this.layer,y,g,this._memCache),I=P.start({signal:this._tileHandlerController.signal,schedule:f}),v=P.spriteMosaic;I.then(()=>this._tileHandlerController=null),this._updatingHandles.addPromise(Promise.all([I,v]).then(([,S])=>{const x=this._tileHandler,w=this.painter;this.painter=new Ee(S,P.glyphMosaic),this._tileHandler=P,this.emit("data-changed"),x.destroy(),w&&w.dispose()}))});const _=Promise.all([r,c,p]);this.addResolvingPromise(_)}destroy(){this.painter=Oe(this.painter),this._tileHandlerController=ze(this._tileHandlerController),this._tileHandler=me(this._tileHandler),this._memCache=me(this._memCache)}get contentZoom(){return _e("disable-feature:vtl-level-shift")?1:this.view.qualitySettings.tiledSurface.vtlContentZoom}get displayLevelRange(){const u=this.tileInfo.lods,e=this.layer.minScale||u[0].scale,i=this.layer.maxScale||u[u.length-1].scale,t=this.levelRangeFromScaleRange(e,i);return this.layer.maxScale?t.maxLevel++:t.maxLevel+=this.levelShift,t}get dataScaleRange(){const u=this.tileInfo.lods;return{minScale:u[0].scale,maxScale:u[u.length-1].scale}}get dataLevelRange(){const{minScale:u,maxScale:e}=this.dataScaleRange,i=this.levelRangeFromScaleRange(u,e);return i.minLevel===1&&this.tileInfo.size[0]===256&&(i.minLevel=0),i.maxLevel+=this.levelShift,i}async fetchTile(u,e,i,t){return this._tileHandler.getVectorTile(u,e,i,t)}};q([B()],O.prototype,"layer",void 0),q([B()],O.prototype,"levelShift",void 0),q([B()],O.prototype,"contentZoom",null),q([B()],O.prototype,"displayLevelRange",null),q([B()],O.prototype,"tileInfo",void 0),q([B()],O.prototype,"dataScaleRange",null),q([B()],O.prototype,"dataLevelRange",null),q([B()],O.prototype,"updatingProgressValue",void 0),O=q([vt("esri.views.3d.layers.VectorTileLayerView3D")],O);const Wi=O;function ci(u){return e=>u.immediate.schedule(e)}export{Wi as default};
