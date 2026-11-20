import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';
import assert from 'node:assert/strict';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
 const {elipseCaseStudies, elipseWorkLinks}=await server.ssrLoadModule('/src/data/elipseCaseStudies.js');
 const {getCaseStudy}=await server.ssrLoadModule('/src/data/caseStudiesData.js');
 const {getServiceDetail}=await server.ssrLoadModule('/src/data/serviceDetailData.js');
 const {default:Template}=await server.ssrLoadModule('/src/pages/CaseStudyTemplate.jsx');
 for(const [slug,study] of Object.entries(elipseCaseStudies)){
  assert.equal(getCaseStudy(slug).slug,slug);
  assert.equal(study.storySection.outcome.galleryImages.length,3);
  assert(!JSON.stringify(study).includes('lexus'));
  const html=renderToString(React.createElement(Template,{slug,caseStudy:study}));
  assert(html.includes(study.hero.titleLine1));
  assert(!html.includes('125K+ Customers'));
  assert(!html.includes('undefined'));
 }
 const works=['interactive-digital-experiences','digital-video-productions'].flatMap(s=>getServiceDetail(s).works);
 for(const [title,route] of Object.entries(elipseWorkLinks))assert(works.some(w=>w.title===title&&w.link===route),title+' missing link');
 console.log('PASS: 12 case studies render, all 12 Work links resolve, image galleries are populated, and no Lexus or invented fallback stats appear.');
} finally {await server.close();}
