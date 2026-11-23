/* Gemeinsame Abbildungen für Arbeitsblatt und Hilfe-Seite (Maße in mm, y nach unten). */
const NS='http://www.w3.org/2000/svg';
function el(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
const S=id=>document.getElementById(id);
const d=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const sg=svg=>el('g',{class:'sol'},svg);
function X(g,p,lab,dx=1.4,dy=-1.2){const s=.9;el('line',{x1:p.x-s,y1:p.y-s,x2:p.x+s,y2:p.y+s,class:'x'},g);el('line',{x1:p.x-s,y1:p.y+s,x2:p.x+s,y2:p.y-s,class:'x'},g);
  if(lab){const t=el('text',{x:p.x+dx,y:p.y+dy,class:'lbl'},g);t.textContent=lab;}}
/* Gerade durch a und b, auf den Bildausschnitt (viewBox) begrenzt */
function L(g,a,b,cls,lab,lp){const vb=(g.ownerSVGElement||g).viewBox.baseVal,m=1;const dx=b.x-a.x,dy=b.y-a.y;let t0=-1e6,t1=1e6;
  [[-dx,a.x-(vb.x-m)],[dx,vb.x+vb.width+m-a.x],[-dy,a.y-(vb.y-m)],[dy,vb.y+vb.height+m-a.y]].forEach(([p,q])=>{if(p===0)return;const t=q/p;if(p<0)t0=Math.max(t0,t);else t1=Math.min(t1,t);});
  el('line',{x1:a.x+t0*dx,y1:a.y+t0*dy,x2:a.x+t1*dx,y2:a.y+t1*dy,class:cls},g);
  if(lab){const t=el('text',{x:lp.x,y:lp.y,class:'lbl',style:`fill:${cls.includes('axl')?'#E0705F':'#4F8BC2'}`},g);t.textContent=lab;}}
function Cc(g,c,r){el('circle',{cx:c.x,cy:c.y,r,class:'cc'},g);}
function refl(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy);const f={x:a.x+t*dx,y:a.y+t*dy};return{x:2*f.x-p.x,y:2*f.y-p.y};}
function ci(c1,r1,c2,r2){const D=d(c1,c2),a=(r1*r1-r2*r2+D*D)/(2*D),h=Math.sqrt(Math.max(0,r1*r1-a*a)),x=c1.x+a*(c2.x-c1.x)/D,y=c1.y+a*(c2.y-c1.y)/D;
  return[{x:x+h*(c2.y-c1.y)/D,y:y-h*(c2.x-c1.x)/D},{x:x-h*(c2.y-c1.y)/D,y:y+h*(c2.x-c1.x)/D}];}
function axisCon(g,P,Q,r,labS){const s=ci(P,r,Q,r);Cc(g,P,r);Cc(g,Q,r);s.forEach((p,i)=>X(g,p,labS?('S'+(i?'₂':'₁')):null));return s;}
function onL(a,b,x){return{x,y:a.y+(x-a.x)*(b.y-a.y)/(b.x-a.x)};}
function seg(g,a,b,col,w=.45){el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:col,'stroke-width':w},g);}
function kosy(s,ox,oy,u,x0,x1,y0,y1){
  for(let i=x0*2;i<=x1*2;i++)el('line',{x1:ox+i*u/2,y1:oy-y1*u,x2:ox+i*u/2,y2:oy-y0*u,class:i%2?'grid1':'grid2'},s);
  for(let j=y0*2;j<=y1*2;j++)el('line',{x1:ox+x0*u,y1:oy-j*u/2,x2:ox+x1*u,y2:oy-j*u/2,class:j%2?'grid1':'grid2'},s);
  el('line',{x1:ox+x0*u,y1:oy,x2:ox+x1*u,y2:oy,stroke:'#2F3440','stroke-width':.35},s);
  el('line',{x1:ox,y1:oy-y0*u,x2:ox,y2:oy-y1*u,stroke:'#2F3440','stroke-width':.35},s);
  const tx=(x,y,t,anc)=>{const e=el('text',{x,y,'text-anchor':anc,style:'font-size:3px;fill:#6B7280'},s);e.textContent=t;};
  for(let i=x0;i<=x1;i++)if(i)tx(ox+i*u,oy+3.6,String(i).replace('-','−'),'middle');
  for(let j=y0;j<=y1;j++)if(j)tx(ox-1.5,oy-j*u+1,String(j).replace('-','−'),'end');
  tx(ox-1.5,oy+3.6,'0','end');
  return(x,y)=>({x:ox+x*u,y:oy-y*u});
}

/* ---------- Theorie-Abbildungen (nur Arbeitsblatt) ---------- */
if(S('f1')){const s=S('f1');const A={x:16,y:42},B={x:46,y:2};L(s,A,B,'axl','a',{x:47.5,y:5});
 const P={x:12,y:12},Pp=refl(P,A,B);const A1={x:25,y:30},A2={x:40,y:10};
 seg(s,A1,P,'#4E9E7B');seg(s,A1,Pp,'#4E9E7B');seg(s,A2,P,'#D9774D');seg(s,A2,Pp,'#D9774D');
 X(s,P,'P',-4,-1);X(s,Pp,'P′',1.4,3.5);X(s,A1,'A₁',1.6,2.4);X(s,A2,'A₂',1.8,1.5);}
if(S('f2a')){
 const P2={x:13,y:26},Q2={x:37,y:12},r2=17;
 const base2=s=>{X(s,P2,'P',-1,3.8);X(s,Q2,'P′',1.4,-1.2);};
 {const s=S('f2a');base2(s);Cc(s,P2,r2);Cc(s,Q2,r2);}
 {const s=S('f2b');base2(s);axisCon(s,P2,Q2,r2,true);}
 {const s=S('f2c');base2(s);const k=axisCon(s,P2,Q2,r2,true);L(s,k[0],k[1],'axl','a',{x:k[1].x-4.5,y:3.2});}
 const A3a={x:6,y:34},A3b={x:44,y:4},P3={x:11,y:9};const P3p=refl(P3,A3a,A3b);
 const PA=onL(A3a,A3b,17),PB=onL(A3a,A3b,33);
 const base3=s=>{L(s,A3a,A3b,'axl','a',{x:44.5,y:9});X(s,P3,'P',-4,0);};
 {const s=S('f3a');base3(s);X(s,PA,'A',-4,1);Cc(s,PA,d(PA,P3));}
 {const s=S('f3b');base3(s);X(s,PA,'A',-4,1);Cc(s,PA,d(PA,P3));X(s,PB,'B',-4,0);Cc(s,PB,d(PB,P3));}
 {const s=S('f3c');base3(s);X(s,PA,'A',-4,1);Cc(s,PA,d(PA,P3));X(s,PB,'B',-4,0);Cc(s,PB,d(PB,P3));X(s,P3p,'P′',1.6,-0.8);}
}

/* Lösungsschritte: jede Gruppe ist ein Schritt (data-step). Auf dem Arbeitsblatt werden alle gezeigt. */
const st=(svg,n)=>el('g',{class:'sol','data-step':n},svg);

[['u1a',{x:12,y:38},{x:44,y:16},'K'],['u1b',{x:14,y:12},{x:46,y:30},'M'],['u1c',{x:20,y:9},{x:36,y:44},'N']].forEach(([id,P,Q,n])=>{
  const s=S(id);if(!s)return;X(s,P,n,1.4,-1.2);X(s,Q,n+'′',1.4,-1.2);const r=d(P,Q)*0.68;const k=ci(P,r,Q,r);
  Cc(st(s,1),P,r);Cc(st(s,2),Q,r);const g3=st(s,3);k.forEach(p=>X(g3,p,''));L(st(s,4),k[0],k[1],'axl');});

/* ---------- Aufgabe 2: Spiegeldreieck ---------- */
if(S('u2')){const s=S('u2');const a1={x:84,y:68},a2={x:98,y:2};L(s,a1,a2,'axl','a',{x:100,y:6});
 const R={x:36,y:18},Sx={x:62,y:10},T={x:48,y:44};[[R,'R'],[Sx,'S'],[T,'T']].forEach(([p,n])=>X(s,p,n,-1.5,-2));
 const pts=[R,Sx,T].map(p=>refl(p,a1,a2));const H1=onL(a1,a2,87),H2=onL(a1,a2,94);
 const g1=st(s,1);X(g1,H1,'H₁',-5,1);X(g1,H2,'H₂',-5,1);
 [R,Sx,T].forEach((p,i)=>{const g=st(s,i+2);Cc(g,H1,d(H1,p));Cc(g,H2,d(H2,p));X(g,pts[i],['R′','S′','T′'][i],1.4,-1.2);});
 el('polygon',{points:pts.map(p=>p.x+','+p.y).join(' '),fill:'none',stroke:'#D23B3B','stroke-width':.4},st(s,5));}

/* ---------- Aufgabe 3a: Koordinatensystem (nur Hilfe-Seite) ---------- */
if(S('u3')){const s=S('u3');const px=kosy(s,14,62,8,-1,7,-1,6);
 const E=px(1,2),Ep=px(5,4);X(s,E,'E',-1,-1.8);X(s,Ep,'E′',1.4,-1.4);const r=3.2*8;const k=ci(E,r,Ep,r);
 Cc(st(s,1),E,r);Cc(st(s,2),Ep,r);const g3=st(s,3);k.forEach(p=>X(g3,p,''));
 L(st(s,4),px(3,3),px(4,1),'axl','a',{x:px(2,5).x-5,y:px(2,5).y});
 const g5=st(s,5);X(g5,px(3,3),'(3|3)',1.6,1.2);X(g5,px(4,1),'(4|1)',1.6,1.2);X(g5,px(2,5),'(2|5)',1.6,1.2);}

/* ---------- Aufgabe 5: Spiegelbild einer Geraden ---------- */
if(S('u5')){const s=S('u5');const a1={x:10,y:60},a2={x:62,y:2};L(s,a1,a2,'axl','a',{x:63,y:7});
 const g1={x:4,y:24},g2={x:72,y:44};L(s,g1,g2,'gl','g',{x:3,y:21});
 const G=onL(g1,g2,12);const Gp=refl(G,a1,a2);
 const den=(a2.x-a1.x)*(g2.y-g1.y)-(a2.y-a1.y)*(g2.x-g1.x);const t=((g1.x-a1.x)*(g2.y-g1.y)-(g1.y-a1.y)*(g2.x-g1.x))/den;
 const Sp={x:a1.x+t*(a2.x-a1.x),y:a1.y+t*(a2.y-a1.y)};X(st(s,1),Sp,'S',1.6,3.6);
 X(st(s,2),G,'G',-1,-2);const H1=onL(a1,a2,24),H2=onL(a1,a2,45);
 const g3=st(s,3);X(g3,H1,'');X(g3,H2,'');Cc(g3,H1,d(H1,G));Cc(g3,H2,d(H2,G));
 X(st(s,4),Gp,'G′',1.4,-1.2);
 L(st(s,5),Sp,Gp,'gl','g′',{x:Sp.x+(Sp.x-Gp.x)*1.2+2,y:Sp.y+(Sp.y-Gp.y)*1.2});}

/* ---------- Aufgabe 6: Fehlersuche ---------- */
if(S('u6')){const s=S('u6');const P={x:16,y:32},Q={x:48,y:24};X(s,P,'P',-4,1);X(s,Q,'P′',1.6,-1.2);
 const k=ci(P,20,Q,28);Cc(s,P,20);Cc(s,Q,28);k.forEach(p=>X(s,p,''));L(s,k[0],k[1],'axl','a?',{x:k[0].x+2.5,y:k[0].y+1});
 const k2=ci(P,22,Q,22);Cc(st(s,1),P,22);Cc(st(s,2),Q,22);const g3=st(s,3);k2.forEach(p=>X(g3,p,''));
 L(st(s,4),k2[0],k2[1],'axl','a',{x:k2[1].x+2,y:k2[1].y+6});}

/* ---------- Aufgabe 7: Schatz der drei Bäume ---------- */
if(S('u7')){const s=S('u7');const px=kosy(s,8,64,9,0,8,0,6);
 const A=px(1,1),B=px(7,1),C=px(7,5);X(s,A,'A',-1,-1.8);X(s,B,'B',1.4,-1.4);X(s,C,'C',1.4,-1.4);
 const g1=st(s,1);axisCon(g1,A,B,4*9,false);L(st(s,2),px(4,0),px(4,6),'axl');
 const g3=st(s,3);axisCon(g3,B,C,3*9,false);L(st(s,4),px(0,3),px(8,3),'axl');
 X(st(s,5),px(4,3),'Z(4|3)',1.4,-1.4);}
