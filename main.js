
// 初期実行
document.addEventListener('DOMContentLoaded',()=>{
    hensu();
    // roadStrage();
    setSavedID();
    startEventListen();
    // constructAll();
    createReadme();

})


//変数宣言
var newFolderButton;
var newFolderArea;
var newFolderTextbox;
var createNewFolderExeButton;
var searchTextbox;
var folderDirectory;
var memoTexrarea;
var updateLabel;
var pathLabel;
var fileNameText;
var sideMenu;
var layer;
var dataryoiki;
var searchResultArea;
var kanriKun;
var kanriKunCloseButton;
var heighligthArea;
var heighlightParent;
var renameButton;
var monacoEditor;
var monacoWin;
var language_lbl;
var powerButton;
var iframeContainer;
var toolframe;
var  exTag_s;
var  exTag_e;
var htmlOnlyCheck;


var editingExcel = false;

// 要素import
function hensu(){
    newFolderButton = document.getElementById('newFolderButton');
    newFolderArea = document.getElementById('newFolderArea');
    newFolderTextbox = document.getElementById('newFolderTextbox');
    createNewFolderExeButton = document.getElementById('createNewFolderExeButton');
    searchTextbox = document.getElementById('searchTextbox');
    folderDirectory = document.getElementById('folderDirectory');
    memoTexrarea = document.getElementById('memoTexrarea');
    updateLabel = document.getElementById('updateLabel');
    pathLabel = document.getElementById('pathLabel');
    fileNameText = document.getElementById('fileNameText');
    sideMenu = document.getElementById('sideMenu');
    layer = document.getElementById('layer');
    dataryoiki = document.getElementById('dataryoiki');
    searchResultArea = document.getElementById('searchResultArea');
    kanriKun = document.getElementById('kanriKun');
    kanriKunCloseButton = document.getElementById('kanriKunCloseButton');
    heighligthArea = document.getElementById('heighligthArea');
    heighlightParent = document.getElementById('heighlightParent');
    renameButton = document.getElementById('renameButton');
    monacoEditor = document.getElementById('monacoEditor');
    powerButton = document.getElementById('powerButton');
    iframeContainer = document.getElementById('iframeContainer');
    toolframe = document.getElementById('toolframe');
    exTag_s = document.getElementById('exTag_s');
    exTag_e = document.getElementById('exTag_e');
    htmlOnlyCheck = document.getElementById('htmlOnlyCheck');
    monacoWin = document.getElementById('monacoWin');//ウィンドウ
    language_lbl = document.getElementById('language_lbl');//言語ラベル


}

var readText = `------------------------------------------------------------------------------------------------------------------------------------------------------
コマンド
------------------------------------------------------------------------------------------------------------------------------------------------------
・【ctrl + S】ダウンロード　※ローカルストレージ廃止
・【ctrl + shift + G】選択中の文字列をGoogle検索
・【ctrl + shift + Enter】テキストハイライト　※view専用
・【ctrl + ;】区切り線
・jsonファイルドロップ：データ読込`;

//new folder
var newFolderMode=false;
function switchFolderMode(){
    //検索結果ボタンリセット
    for(let element of Array.from(document.getElementsByClassName('searchresultButton'))){
        element.remove();
    }
    switch (newFolderMode){

        case true:{
            //mode=false
            newFolderMode=false;
            searchTextbox.hidden=false;
            newFolderArea.hidden=true;
            newFolderButton.classList.remove('buttonOn');
            searchTextbox.focus();
            break;
        }

        case false:{
            //mode=true
            newFolderMode=true;
            searchTextbox.hidden=true;
            newFolderArea.hidden=false;
            newFolderButton.classList.add('buttonOn');
            newFolderTextbox.focus();
            break;
        }

    }
}

//フォルダ生成　大元
function BeforeCreateFolderFunction(){
    createFolderFunction(folderDirectory,newFolderTextbox,newFolderTextbox.value,"","folder","","","",true,false,"","",false);
}

//read me
function createReadme(){
    createFolderFunction(folderDirectory,"readme","read me","","file","","","",false,false,"","",true);
}

// フォルダ作成📁*************************************************************************************************
function createFolderFunction(parentDiv,nameTextbox,value,path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,constructorID,constructorName,isReadMe){

    switch(type){
        case "folder":{

            var folderName = value;
            if(isConstruct)folderName=constructorName;

            if(!isConstruct){
                //未入力チェック
                if(folderName==""){
                    alert("フォルダ名を入力してください。");
                    nameTextbox.focus();
                    return;
                }
                // > 使用不可
                if(folderName.indexOf(">") != -1){
                    alert(" > は使用できません。");
                    nameTextbox.focus();
                    return;
                }
            }

            //空ですラベル非表示
            if(emptyLabelParam != ""){
                emptyLabelParam.hidden=true;
            }

            //一括選択時
            if(folderName.indexOf(",") != -1){
                let array = splitComma(folderName);
                for(let i = 0; i < array.length; i++){
                    createFolderFunction(parentDiv,nameTextbox,array[i],path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,"","");
                }
                return;
            }

            //親div生成
            const div = document.createElement('div');
            div.style.width='100%';
            div.classList.add('mt-1');
                //線を描画
            div.style.borderTop="none";
            div.style.borderRight="none";
            div.style.borderBottom="none";
            div.style.borderLeft="1px solid rgba(203, 206, 233, 0.3)";
            parentDiv.appendChild(div);

                //フォルダ名　ボタン生成
                const folder = document.createElement('button');
                folder.textContent=`📁${folderName}`;
                folder.classList.add('isFolder');
                folder.id=randomID();
                if(isConstruct)folder.id=constructorID;
                folder.addEventListener('click',function(event){

                    //操作中要素に設定
                    currentElementID=folder.id;
                    currentFolderID=folder.id;

                    if(folder.textContent.startsWith('📁')){
                        //アイコン切替・ハイライト
                        folder.textContent=`📂${folderName}`;
                        // folder.style.backgroundColor="rgba(0,0,0,0.3)";
                        // folder.style.fontWeight="bold";
                        folder.style.textDecoration="underline";
                        //子要素表示〇
                        for(let element of div2.children){
                            element.hidden=false;
                        }
                        for(let element of div3.children){
                            element.hidden=false;
                        }
                        childFlg=true;
                        // 新規作成　非表示
                        for(let element of div2.children){
                            element.hidden=true;
                        }
                        //空ですラベル表示
                        if(div3.children.length == 0){
                            emptyLabel.hidden=false;
                        }else{
                            emptyLabel.hidden=true;
                        }
                        plusButton.hidden=false;
                        
                    }else{
                        //アイコン切替・ハイライト
                        folder.textContent=`📁${folderName}`;
                        folder.style.backgroundColor="transparent";
                        folder.style.fontWeight="normal";
                        folder.style.textDecoration="none";
                        childFlg=false;
                        //子要素非表示✖
                        for(let element of div2.children){
                            element.hidden=true;
                        }
                        for(let element of div3.children){
                            element.hidden=true;
                        }
                        emptyLabel.hidden=true;
                        plusButton.hidden=true;
                    }

                    
                })

                //右クリックイベント（新規作成）
                folder.addEventListener('contextmenu',function(event){
                    // //デフォルトの右クリックイベントを無効
                    event.preventDefault();
                    folder.style.opacity="0.3";
                    deleteButton.hidden=false;
                    deleteLayer.hidden=false;
                })

                div.appendChild(folder);

                //削除ボタン
                const deleteButton = document.createElement('button');
                deleteButton.textContent="⚠削除";
                deleteButton.style.position="absolute";
                deleteButton.hidden=true;
                deleteButton.style.zIndex=120;
                deleteButton.classList.add('deleteButton');
                deleteButton.style.backgroundColor="rgba(219, 101, 101, 0.8)";
                deleteButton.style.color="white";
                deleteButton.addEventListener('click',function(event){
                    //画面から削除
                    for(let element of div.children){
                        element.remove();
                        try{//このidがあれば実行　※なければエラーになるため。ない場合＝folder、file以外のid
                        mainData[element.id].type="deleted";
                        }catch(error){}
                    }
                    div.remove();//※自分から消すと子要素が参照できなくなる
                    mainData[folder.id].type="deleted";
                    //savaStrage();//--ok!
                });
                div.appendChild(deleteButton);

                //削除時用レイヤー
                const deleteLayer = document.createElement('div');
                deleteLayer.style.backgroundColor="transparent";
                deleteLayer.style.position="absolute";
                deleteLayer.style.width="100vw";
                deleteLayer.style.height="100vh";
                deleteLayer.style.left="0%";
                deleteLayer.style.top="0%";
                deleteLayer.style.zIndex=100;
                deleteLayer.hidden=true;
                deleteLayer.addEventListener('click',function(event){
                    deleteButton.hidden=true;
                    deleteLayer.hidden=true;
                    folder.style.opacity="1.0";
                });
                document.body.appendChild(deleteLayer);

                //新規作成　出現ボタン
                const plusButton = document.createElement('button');
                plusButton.classList.add('button');
                plusButton.classList.add('buttonChild');
                plusButton.classList.add('ml-2');
                plusButton.textContent="＋";
                plusButton.hidden=true;
                plusButton.style.fontWeight="bold";
                plusButton.addEventListener('click',function(event){
                    //自分非表示
                    plusButton.hidden=true;
                    // 新規作成　表示
                    for(let element of div2.children){
                        element.hidden=false;
                    }
                    childTextbox.focus();

                })
                div.appendChild(plusButton);

                // パスラベル生成
                const pathLabel = document.createElement('label');
                pathLabel.classList.add('isPathLabel');
                pathLabel.classList.add('ml-2');
                pathLabel.textContent=path;
                div.appendChild(pathLabel);

                // //空行作成
                // const space = document.createElement('p');
                // div.appendChild(space);

                //子要素div生成
                const div2 = document.createElement('div');
                div2.style.width='100%';
                div2.classList.add('mt-1');
                div.appendChild(div2);

                //子要素div生成
                const div4 = document.createElement('div');
                div4.style.width='100%';
                div4.classList.add('mt-1');
                div.appendChild(div4);

                //子要素div生成
                const div3 = document.createElement('div');
                div2.style.width='100%';
                div2.classList.add('mt-1');
                div.appendChild(div3);


                
                    //”フォルダは空です”ラベル
                    const emptyLabel = document.createElement('label');
                    // emptyLabel.style.color="rgb(175, 175, 175)";
                    emptyLabel.style.color="rgb(240, 120, 100)";
                    emptyLabel.textContent=">フォルダは空です";
                    emptyLabel.hidden=true;
                    div4.appendChild(emptyLabel);

                    //>ラベル
                    const rootLabel = document.createElement('label');
                    rootLabel.style.color="rgb(175, 175, 175)";
                    rootLabel.textContent=">";
                    rootLabel.hidden=true;
                    div2.appendChild(rootLabel);

                    //子要素作成用テキストボックス　※初期非表示
                    const childTextbox = document.createElement('input');
                    childTextbox.type="text";
                    childTextbox.classList.add('textbox1');
                    childTextbox.placeholder="新規フォルダ／ファイル／ツール名";
                    childTextbox.hidden=true;
                    childTextbox.style.width="270px";
                    div2.appendChild(childTextbox);

                    //new folder　※初期非表示
                    const newFolderButtonChild = document.createElement('button');
                    newFolderButtonChild.classList.add('button');
                    newFolderButtonChild.classList.add('buttonChild');
                    newFolderButtonChild.classList.add('ml-2');//隙間
                    newFolderButtonChild.textContent="📁";
                    newFolderButtonChild.hidden=true;
                    newFolderButtonChild.addEventListener('click',function(event){
                        currentParentFolderID=folder.id;//親フォルダidを参照
                        createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"folder",emptyLabel,folder,idParam,false,false,"","",false);
                    })
                    div2.appendChild(newFolderButtonChild);

                    //new file　※初期非表示
                    const newFileButtonChild = document.createElement('button');
                    newFileButtonChild.classList.add('button');
                    newFileButtonChild.classList.add('buttonChild');
                    newFileButtonChild.classList.add('ml-2');//隙間
                    newFileButtonChild.textContent="📄";
                    newFileButtonChild.hidden=true;
                    newFileButtonChild.addEventListener('click',function(event){
                        createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"file",emptyLabel,folder,idParam,false,false,"","",false);
                    })
                    div2.appendChild(newFileButtonChild);

                    //new tool　※初期非表示
                    const newToolButtonChild = document.createElement('button');
                    newToolButtonChild.classList.add('button');
                    newToolButtonChild.classList.add('buttonChild');
                    newToolButtonChild.classList.add('ml-2');//隙間
                    newToolButtonChild.textContent="🤖";
                    newToolButtonChild.hidden=true;
                    newToolButtonChild.addEventListener('click',function(event){
                        createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"tool",emptyLabel,folder,idParam,false,false,"","",false);
                    })
                    div2.appendChild(newToolButtonChild);

                    //new excel　※初期非表示
                    const newExcelButtonChild = document.createElement('button');
                    newExcelButtonChild.classList.add('button');
                    newExcelButtonChild.classList.add('buttonChild');
                    newExcelButtonChild.classList.add('ml-2');//隙間
                    newExcelButtonChild.textContent="📊";
                    newExcelButtonChild.hidden=true;
                    newExcelButtonChild.addEventListener('click',function(event){
                        createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"excel",emptyLabel,folder,idParam,false,false,"","",false);
                    })
                    div2.appendChild(newExcelButtonChild);

                    //close create　※初期非表示
                    const closeButtonChild = document.createElement('button');
                    closeButtonChild.classList.add('button');
                    closeButtonChild.classList.add('buttonChild');
                    closeButtonChild.classList.add('ml-2');//隙間
                    closeButtonChild.style.fontWeight="bold";
                    closeButtonChild.textContent="✖";
                    closeButtonChild.hidden=true;
                    closeButtonChild.addEventListener('click',function(event){
                        plusButton.hidden=false;
                        for(let element of div2.children){
                            element.hidden=true;
                        }
                    })
                    div2.appendChild(closeButtonChild);

                // //空行作成
                // const spaceEnd = document.createElement('p');
                // div.appendChild(spaceEnd);


            //パス更新
            switch(path){
                case "" :
                    path=`${folderName}`;
                    break;

                default :
                    path=`${path} > ${folderName}`;
                    break;
            }
            const currentPath=path;

            //親要素idの継承
            const idParam = parentIDPath=="" ? folder.id : `${parentIDPath},${folder.id}`;

            //jsonデータ作成

            // //最上階層　判定
            // var topFlg=false;
            // if(parentFolder==""){
            //     topFlg=true;
            // }

            //再描画の場合はスキップ
            if(!isConstruct){
                //フォルダデータ作成
                mainData[folder.id]={
                    id:folder.id,
                    top:isTop,
                    type:"フォルダ",
                    name:folderName,
                    parentID:parentFolder.id,
                    parentIDPath:idParam,
                    path:path
                    // hasChild:false
                }

                //親フォルダのhasChild＝true --ok.
                // if(!isTop)mainData[parentFolder.id].hasChild=true;
            }

            //階層段
            div.style.marginLeft="20px";

            //子要素再構築
            // if(isConstruct){
            //     //直下の子要素を取得
            //     const childArray = Object.values(mainData).filter(item => item.parentID == constructorID);
            //     for(let i = 0; i < childArray.length; i++){
            //         if(childArray[i].type=="フォルダ"){
            //             createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"folder",emptyLabel,folder,idParam,false,true,childArray[i].id,childArray[i].name);
            //         }else if(childArray[i].type=="ファイル"){
            //             createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"file",emptyLabel,folder,idParam,false,true,childArray[i].id,childArray[i].name);
            //         }
            //     }
            // }

            if(isConstruct){
                //直下の子要素を取得
                const folderArray = Object.values(mainData).filter(item => (item.parentID == constructorID) && (item.type=="フォルダ"));
                for(let i = 0; i < folderArray.length; i++){
                    createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"folder",emptyLabel,folder,idParam,false,true,folderArray[i].id,folderArray[i].name,false);
                }
                const fileArray = Object.values(mainData).filter(item => (item.parentID == constructorID) && (item.type=="ファイル"));
                for(let i = 0; i < fileArray.length; i++){
                    createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"file",emptyLabel,folder,idParam,false,true,fileArray[i].id,fileArray[i].name,false);
                }
                const toolArray = Object.values(mainData).filter(item => (item.parentID == constructorID) && (item.type=="ツール"));
                for(let i = 0; i < toolArray.length; i++){
                    createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"tool",emptyLabel,folder,idParam,false,true,toolArray[i].id,toolArray[i].name,false, toolArray[i].html, toolArray[i].css, toolArray[i].js);
                }
                const excelArray = Object.values(mainData).filter(item => (item.parentID == constructorID) && (item.type=="エクセル"));
                for(let i = 0; i < excelArray.length; i++){
                    createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"excel",emptyLabel,folder,idParam,false,true,excelArray[i].id,excelArray[i].name,false);
                }
            }

            if(isConstruct && !isTop){
                div.hidden=true;
            }

            //変更を保存
            //savaStrage();

            //フォルダ名ボックスクリア
            nameTextbox.value="";

            //フォーカス
            nameTextbox.focus();

            break;
        }

        case "file":{//************************************************************************************************************ */
        
            if(isReadMe){
                //親div生成
                const div = document.createElement('div');
                div.style.width='100%';
                parentDiv.appendChild(div);
    
                //ファイル名　ボタン生成
                const file = document.createElement('button');
                file.textContent="📄read me";
                file.classList.add('isFile');
                file.id=randomID();
                //クリックイベント
                file.addEventListener('click',function(event){
                    //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                    memoTexrarea.value=readText;
                    fileNameText.value="read me";
                    updateLabel.textContent="----/--/--";
                    pathLabel.textContent="";
                    //選択用クラス除去
                    for(let element of Array.from(document.getElementsByClassName('openFile'))){
                        element.classList.remove('openFile');
                    }
                    //選択用クラス自分に付与
                    file.classList.add('openFile');
                    //ハイライト非表示
                    heighlightParent.hidden=true;
                    pathLabel.classList.remove('pathHi');
                    fileNameText.classList.remove('boxHi');
                    renameButton.classList.remove('buttonHi');
                })
                div.appendChild(file);
                return;
            }
            var fileName = value;
            if(isConstruct)fileName=constructorName;

            if(!isConstruct && !isReadMe){
                //未入力チェック
                if(fileName==""){
                    alert("ファイル名を入力してください。");
                    nameTextbox.focus();
                    return;
                }
                // > 使用不可
                if(fileName.indexOf(">") != -1){
                    alert(" > は使用できません。");
                    nameTextbox.focus();
                    return;
                }
            }

            //空ですラベル非表示
            emptyLabelParam.hidden=true;

            //一括選択時
            if(fileName.indexOf(",") != -1){
                let array = splitComma(fileName);
                for(let i = 0; i < array.length; i++){
                    createFolderFunction(parentDiv,nameTextbox,array[i],path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,"","",false);
                }
                return;
            }
    
            //親div生成
            const div = document.createElement('div');
            div.style.width='100%';
            parentDiv.appendChild(div);
    
                //ファイル名　ボタン生成
                const file = document.createElement('button');
                file.textContent=`📄${fileName}`;
                file.classList.add('isFile');
                file.id=randomID();
                if(isConstruct)file.id=constructorID;
                //クリックイベント
                file.addEventListener('click',function(event){
                    editingExcel = false;
                    //操作中要素に設定
                    currentElementID=file.id;
                    currentFileID=file.id;
                    //エクセル表示
                    excelArea.hidden=true;
                    //モナコ切替
                    monacoWin.hidden = true;
                    memoTexrarea.hidden = false;
                    iframeContainer.hidden = true;
                    //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                    memoTexrarea.value=mainData[currentFileID].memo;
                    fileNameText.value=mainData[currentFileID].name;
                    updateLabel.textContent=mainData[currentFileID].updateAt;
                    pathLabel.textContent=mainData[currentFileID].path;
                    //選択用クラス除去
                    for(let element of Array.from(document.getElementsByClassName('openFile'))){
                        element.classList.remove('openFile');
                    }
                    //選択用クラス自分に付与
                    file.classList.add('openFile');
                    //親フォルダにクラス付与
                    parentFolder.classList.add('openFile');
                    // //ハイライトjs
                    // heighligthArea.textContent=memoTexrarea.value;
                    // hljs.highlightElement(heighligthArea);
                    // heighlightParent.hidden=false;
                    // //スタイル
                    // pathLabel.classList.add('pathHi');
                    // fileNameText.classList.add('boxHi');
                    // renameButton.classList.add('buttonHi');
                    //ハイライト非表示
                    heighlightParent.hidden=true;
                    pathLabel.classList.remove('pathHi');
                    fileNameText.classList.remove('boxHi');
                    renameButton.classList.remove('buttonHi');

                    memoTexrarea.focus();

                })
    
                //右クリックイベント（新規作成）
                file.addEventListener('contextmenu',function(event){
                    // //デフォルトの右クリックイベントを無効
                    event.preventDefault();
                    file.style.opacity="0.3";
                    deleteButton.hidden=false;
                    deleteLayer.hidden=false;
                })

                //削除ボタン
                const deleteButton = document.createElement('button');
                deleteButton.textContent="⚠削除";
                deleteButton.style.position="absolute";
                deleteButton.style.left="15%";
                deleteButton.hidden=true;
                deleteButton.style.zIndex=120;
                deleteButton.classList.add('deleteButton');
                deleteButton.style.backgroundColor="rgba(219, 101, 101, 0.8)";
                deleteButton.style.color="white";
                deleteButton.addEventListener('click',function(event){
                    //画面から削除
                    div.remove();//※自分から消すと子要素が参照できなくなる
                    mainData[file.id].type="deleted";
                    //savaStrage();//--ok!
                });
                div.appendChild(deleteButton);

                //削除時用レイヤー
                const deleteLayer = document.createElement('div');
                deleteLayer.style.backgroundColor="transparent";
                deleteLayer.style.position="absolute";
                deleteLayer.style.width="100vw";
                deleteLayer.style.height="100vh";
                deleteLayer.style.left="0%";
                deleteLayer.style.top="0%";
                deleteLayer.style.zIndex=100;
                deleteLayer.hidden=true;
                deleteLayer.addEventListener('click',function(event){
                    deleteButton.hidden=true;
                    deleteLayer.hidden=true;
                    file.style.opacity="1.0";
                });
                document.body.appendChild(deleteLayer);

    
                div.appendChild(file);
    
                // // パスラベル生成
                // const pathLabel = document.createElement('label');
                // pathLabel.classList.add('isPathLabel');
                // pathLabel.classList.add('ml-2');
                // pathLabel.textContent=path;
                // div.appendChild(pathLabel);

            //親要素idの継承
            const idParam = parentIDPath=="" ? file.id : `${parentIDPath},${file.id}`;

            //再描画の場合はスキップ
            if(!isConstruct){
                //ファイルデータ作成
                mainData[file.id]={
                    id:file.id,
                    type:"ファイル",
                    name:fileName,
                    parentID:parentFolder.id,
                    parentIDPath:idParam,
                    path:path,
                    memo:"",
                    updateAt:getCurrentDate()
                };

                //親フォルダのhasChild＝true --ok.
                // if(!isTop)mainData[parentFolder.id].hasChild=true;
            }

            if(isConstruct){
                div.hidden=true;
            }

            //変更を保存
            //savaStrage();
    
            //階層段
            div.style.marginLeft="20px";
    
            //ファイル名ボックスクリア
            nameTextbox.value="";
    
            //フォーカス
            nameTextbox.focus();
    
            break;
    }

    case "tool":{//************************************************************************************************************ */

        var toolName = value;
        if(isConstruct)toolName=constructorName;

        if(!isConstruct && !isReadMe){
            //未入力チェック
            if(toolName==""){
                alert("ツール名を入力してください。");
                nameTextbox.focus();
                return;
            }
            // > 使用不可
            if(toolName.indexOf(">") != -1){
                alert(" > は使用できません。");
                nameTextbox.focus();
                return;
            }
        }

        //空ですラベル非表示
        emptyLabelParam.hidden=true;

        //一括選択時
        if(toolName.indexOf(",") != -1){
            let array = splitComma(toolName);
            for(let i = 0; i < array.length; i++){
                createFolderFunction(parentDiv,nameTextbox,array[i],path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,"","",false);
            }
            return;
        }

        //親div生成
        const div = document.createElement('div');
        div.style.width='100%';
        parentDiv.appendChild(div);

            //ツール名　ボタン生成
            const tool = document.createElement('button');
            tool.textContent=`🤖${toolName}`;
            tool.classList.add('isTool');
            tool.id=randomID();
            if(isConstruct)tool.id=constructorID;
            //クリックイベント
            tool.addEventListener('click',function(event){
                editingExcel = false;
                //操作中要素に設定
                currentElementID=tool.id;
                currentToolID=tool.id;
                //エクセル表示
                excelArea.hidden=true;
                //モナコ切替
                monacoWin.hidden = false;
                memoTexrarea.hidden = true;
                window.editor.layout();
                //htmlタブを表示
                langKbn = 1;
                setExTag();
                if (editor.getModel()) {
                    monaco.editor.setModelLanguage(editor.getModel(), "html");
                }
                language_lbl.textContent = "html";
                //htmlOnlyチェック
                htmlOnlyCheck.checked=mainData[currentToolID].htmlOnly;
                htmlOnly();
                //電源ボタンリセット
                powerFlg = false;//初期実行　※falseのときtrueに変更される
                setPower();
                //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                window.editor.setValue(mainData[currentToolID].html);
                fileNameText.value=mainData[currentToolID].name;
                updateLabel.textContent=mainData[currentToolID].updateAt;
                pathLabel.textContent=mainData[currentToolID].path;
                //選択用クラス除去
                for(let element of Array.from(document.getElementsByClassName('openFile'))){
                    element.classList.remove('openFile');
                }
                //選択用クラス自分に付与
                tool.classList.add('openFile');
                //親フォルダにクラス付与
                parentFolder.classList.add('openFile');
                // //ハイライトjs
                // heighligthArea.textContent=memoTexrarea.value;
                // hljs.highlightElement(heighligthArea);
                // heighlightParent.hidden=false;
                // //スタイル
                // pathLabel.classList.add('pathHi');
                // toolNameText.classList.add('boxHi');
                // renameButton.classList.add('buttonHi');
                //ハイライト非表示
                heighlightParent.hidden=true;
                pathLabel.classList.remove('pathHi');
                fileNameText.classList.remove('boxHi');
                renameButton.classList.remove('buttonHi');

                //フォーカス
                window.editor.focus();

            })

            //右クリックイベント（新規作成）
            tool.addEventListener('contextmenu',function(event){
                // //デフォルトの右クリックイベントを無効
                event.preventDefault();
                tool.style.opacity="0.3";
                deleteButton.hidden=false;
                deleteLayer.hidden=false;
            })

            //削除ボタン
            const deleteButton = document.createElement('button');
            deleteButton.textContent="⚠削除";
            deleteButton.style.position="absolute";
            deleteButton.style.left="15%";
            deleteButton.hidden=true;
            deleteButton.style.zIndex=120;
            deleteButton.classList.add('deleteButton');
            deleteButton.style.backgroundColor="rgba(219, 101, 101, 0.8)";
            deleteButton.style.color="white";
            deleteButton.addEventListener('click',function(event){
                //画面から削除
                div.remove();//※自分から消すと子要素が参照できなくなる
                mainData[tool.id].type="deleted";
                //savaStrage();//--ok!
            });
            div.appendChild(deleteButton);

            //削除時用レイヤー
            const deleteLayer = document.createElement('div');
            deleteLayer.style.backgroundColor="transparent";
            deleteLayer.style.position="absolute";
            deleteLayer.style.width="100vw";
            deleteLayer.style.height="100vh";
            deleteLayer.style.left="0%";
            deleteLayer.style.top="0%";
            deleteLayer.style.zIndex=100;
            deleteLayer.hidden=true;
            deleteLayer.addEventListener('click',function(event){
                deleteButton.hidden=true;
                deleteLayer.hidden=true;
                tool.style.opacity="1.0";
            });
            document.body.appendChild(deleteLayer);


            div.appendChild(tool);

            // // パスラベル生成
            // const pathLabel = document.createElement('label');
            // pathLabel.classList.add('isPathLabel');
            // pathLabel.classList.add('ml-2');
            // pathLabel.textContent=path;
            // div.appendChild(pathLabel);

        //親要素idの継承
        const idParam = parentIDPath=="" ? tool.id : `${parentIDPath},${tool.id}`;

        //再描画の場合はスキップ
        if(!isConstruct){
            //ファイルデータ作成
            mainData[tool.id]={
                id:tool.id,
                type:"ツール",
                name:toolName,
                parentID:parentFolder.id,
                parentIDPath:idParam,
                path:path,
                html:"",
                css:"",
                js:"",
                htmlOnly:false,
                updateAt:getCurrentDate()
            };

            //親フォルダのhasChild＝true --ok.
            // if(!isTop)mainData[parentFolder.id].hasChild=true;
        }

        if(isConstruct){
            div.hidden=true;
        }

        //変更を保存
        //savaStrage();

        //階層段
        div.style.marginLeft="20px";

        //ファイル名ボックスクリア
        nameTextbox.value="";

        //フォーカス
        nameTextbox.focus();

        break;
}

    case "excel":{//************************************************************************************************************ */

        var excelName = value;
        if(isConstruct)excelName=constructorName;

        if(!isConstruct && !isReadMe){
            //未入力チェック
            if(excelName==""){
                alert("グリッド名を入力してください。");
                nameTextbox.focus();
                return;
            }
            // > 使用不可
            if(excelName.indexOf(">") != -1){
                alert(" > は使用できません。");
                nameTextbox.focus();
                return;
            }
        }

        //空ですラベル非表示
        emptyLabelParam.hidden=true;

        //一括選択時
        if(excelName.indexOf(",") != -1){
            let array = splitComma(excelName);
            for(let i = 0; i < array.length; i++){
                createFolderFunction(parentDiv,nameTextbox,array[i],path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,"","",false);
            }
            return;
        }

        //親div生成
        const div = document.createElement('div');
        div.style.width='100%';
        parentDiv.appendChild(div);

            //グリッド名　ボタン生成
            const excel = document.createElement('button');
            excel.textContent=`📊${excelName}`;
            excel.classList.add('isExcel');
            excel.id=randomID();
            if(isConstruct)excel.id=constructorID;
            //クリックイベント
            excel.addEventListener('click',function(event){
                editingExcel = true;
                //操作中要素に設定
                currentElementID=excel.id;
                currentExcelID=excel.id;
                //エクセル表示
                excelArea.hidden=false;
                reflectExcelData();
                //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                fileNameText.value=mainData[currentExcelID].name;
                updateLabel.textContent=mainData[currentExcelID].updateAt;
                pathLabel.textContent=mainData[currentExcelID].path;
                //モナコ切替
                monacoWin.hidden = true;
                // memoTexrarea.hidden = false;
                iframeContainer.hidden = true;
                //選択用クラス除去
                for(let element of Array.from(document.getElementsByClassName('openFile'))){
                    element.classList.remove('openFile');
                }
                //選択用クラス自分に付与
                excel.classList.add('openFile');
                //親フォルダにクラス付与
                parentFolder.classList.add('openFile');
                //ハイライト非表示
                heighlightParent.hidden=true;
                pathLabel.classList.remove('pathHi');
                fileNameText.classList.remove('boxHi');
                renameButton.classList.remove('buttonHi');

                //フォーカス
                window.editor.focus();

            })

            //右クリックイベント（新規作成）
            excel.addEventListener('contextmenu',function(event){
                // //デフォルトの右クリックイベントを無効
                event.preventDefault();
                excel.style.opacity="0.3";
                deleteButton.hidden=false;
                deleteLayer.hidden=false;
            })

            //削除ボタン
            const deleteButton = document.createElement('button');
            deleteButton.textContent="⚠削除";
            deleteButton.style.position="absolute";
            deleteButton.style.left="15%";
            deleteButton.hidden=true;
            deleteButton.style.zIndex=120;
            deleteButton.classList.add('deleteButton');
            deleteButton.style.backgroundColor="rgba(219, 101, 101, 0.8)";
            deleteButton.style.color="white";
            deleteButton.addEventListener('click',function(event){
                //画面から削除
                div.remove();//※自分から消すと子要素が参照できなくなる
                mainData[excel.id].type="deleted";
                //savaStrage();//--ok!
            });
            div.appendChild(deleteButton);

            //削除時用レイヤー
            const deleteLayer = document.createElement('div');
            deleteLayer.style.backgroundColor="transparent";
            deleteLayer.style.position="absolute";
            deleteLayer.style.width="100vw";
            deleteLayer.style.height="100vh";
            deleteLayer.style.left="0%";
            deleteLayer.style.top="0%";
            deleteLayer.style.zIndex=100;
            deleteLayer.hidden=true;
            deleteLayer.addEventListener('click',function(event){
                deleteButton.hidden=true;
                deleteLayer.hidden=true;
                excel.style.opacity="1.0";
            });
            document.body.appendChild(deleteLayer);


            div.appendChild(excel);

        //親要素idの継承
        const idParam = parentIDPath=="" ? excel.id : `${parentIDPath},${excel.id}`;

        //再描画の場合はスキップ
        if(!isConstruct){
            //ファイルデータ作成
            mainData[excel.id]={
                id:excel.id,
                type:"エクセル",
                name:excelName,
                parentID:parentFolder.id,
                parentIDPath:idParam,
                path:path,
                updateAt:getCurrentDate(),
                cellData:{}
            };
            //エクセルデータ作成
            createExcelData(excel.id);
        }

        if(isConstruct){
            div.hidden=true;
        }

        //変更を保存
        //savaStrage();

        //階層段
        div.style.marginLeft="20px";

        //ファイル名ボックスクリア
        nameTextbox.value="";

        //フォーカス
        nameTextbox.focus();

        break;

    }
}
}






//jsonデータ
var mainData={};

var currentElementID;//file / folder
var currentFolderID;// folder
var currentFileID;// file
var currentToolID;// tool
var currentExcelID;// excel

var currentParentFolderID;//子要素作成ボタン押下時に親フォルダを参照する


//ローカルストレージ*****************************************************************
//保存
// function //savaStrage(){
//     try{
//     if(mainData == null)return;
//     localStorage.setItem("mainData",JSON.stringify(mainData));
//     dataryoiki.value=mainData;
// }catch(error){}
// }

// //読込
// function roadStrage(){
//     try{
//         const storedData = localStorage.getItem("mainData");
//         if (storedData) {
//             mainData = JSON.parse(storedData);
//         }
//     }catch(error){}
// }



// データを基に画面構築***********************************************************************
function constructAll(){
    //先頭フォルダを取得（構築）
    let topFolderArray = Object.values(mainData).filter(item => (item.top===true) && (item.type!="deleted"));
    for(let i = 0; i < topFolderArray.length; i++){//先頭フォルダの数だけ繰り返し
        //固有の先頭フォルダ
        const topFolder = topFolderArray[i];
        createFolderFunction(folderDirectory,newFolderTextbox,topFolder.name,"","folder","","","",true,true,topFolder.id,topFolder.name,false);//idと表示名は必須
    }
}



//メニュー表示
function openMenu(){
    layer.hidden=false;
    sideMenu.hidden=false;
}



//メニュー終了
function closeMenu(){
    layer.hidden=true;
    sideMenu.hidden=true;
}


//管理くん終了
function kanriKunClose(){
    kanriKun.hidden=true;
    kanriKunCloseButton.hidden=true;
}


// イベントリスナー(dom読込後に開始)*****************************************************************************
function startEventListen(){
    memoTexrarea.addEventListener('input',function(event){
        //ファイル未選択時
        try{
        //ドキュメント、更新日更新（表示：ドキュメント、ファイル名、更新日、パス）
        mainData[currentFileID].memo=memoTexrarea.value;
        mainData[currentFileID].updateAt=getCurrentDate();
        //変更を保存
        //savaStrage();
        }catch(error){}
    })

    // memoTexrarea.addEventListener('scroll', function(event) {
    //     heighligthArea.scrollTop = memoTexrarea.scrollTop;  // scrollTopの正しいプロパティ名
    // });
    
    // dataryoiki.addEventListener('input',function(event){
    //     //savaStrage();
    // })

    //-----挿入
    document.addEventListener('keydown',function(event){
        if(event.ctrlKey && event.key===';'){
            //デフォルト処理無効化
            event.preventDefault();
            // カーソル位置を取得
            var cursorS = memoTexrarea.selectionStart;
            var cursorE = memoTexrarea.selectionEnd;
            //前 | 後ろ（この間に挿入して代入）
            var newText = `${memoTexrarea.value.substring(0,cursorS)}------------------------------------------------------------------------------------------------------------------------------------------------------${memoTexrarea.value.substring(cursorE)}`;
            memoTexrarea.value=newText;
            //ドキュメント、更新日更新（表示：ドキュメント、ファイル名、更新日、パス）
            mainData[currentFileID].memo=memoTexrarea.value;
            mainData[currentFileID].updateAt=getCurrentDate();
            //変更を保存
            //savaStrage();
        }
    })

    //思考マップ挿入
    document.addEventListener('keydown',function(event){
        if(event.ctrlKey && event.shiftKey && event.key==='M'){
            //デフォルト処理無効化
            event.preventDefault();
            // カーソル位置を取得
            var cursorS = memoTexrarea.selectionStart;
            var cursorE = memoTexrarea.selectionEnd;
            //前 | 後ろ（この間に挿入して代入）
            var newText = `${memoTexrarea.value.substring(0,cursorS)}------------------------------------------------------------------------------------------------------------------------------------------------------
最終成果
------------------------------------------------------------------------------------------------------------------------------------------------------



------------------------------------------------------------------------------------------------------------------------------------------------------
手順
------------------------------------------------------------------------------------------------------------------------------------------------------

①
②
③
④
⑤
⑥
⑦
⑧
⑨
⑩${memoTexrarea.value.substring(cursorE)}`;
            memoTexrarea.value=newText;
            //ドキュメント、更新日更新（表示：ドキュメント、ファイル名、更新日、パス）
            mainData[currentFileID].memo=memoTexrarea.value;
            mainData[currentFileID].updateAt=getCurrentDate();
            //変更を保存
            //savaStrage();
        }
    })

    

    //選択内容でgoogle検索
    document.addEventListener('keydown',function(event){
        //ctrl + shift + enter
        if(event.ctrlKey && event.shiftKey && event.key === 'G'){
            // 新しいタブでページ遷移
            window.open(`https://www.google.com/search?q=${window.getSelection().toString()}`, "_blank");

        }
    })

    //管理君
    document.addEventListener('keydown', function(event) {
        // ctrl + shift + enter
        if (event.ctrlKey && event.shiftKey && event.key === 'K') {
    
            if(kanriKun.hidden==true){
                //表示
                kanriKun.hidden=false;
                kanriKunCloseButton.hidden=false;
            }else{
                //非表示
                kanriKunClose();
            }
        }
    });

    //ハイライトｊｓ
    document.addEventListener('keydown', function(event) {
        // ctrl + shift + enter
        if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
    
            if(heighlightParent.hidden==true){
                //表示
                //ハイライトjs
                heighligthArea.textContent=memoTexrarea.value;
                hljs.highlightElement(heighligthArea);
                heighlightParent.hidden=false;
                //スタイル
                pathLabel.classList.add('pathHi');
                fileNameText.classList.add('boxHi');
                renameButton.classList.add('buttonHi');
            }else{
                //ハイライト非表示
                heighlightParent.hidden=true;
                pathLabel.classList.remove('pathHi');
                fileNameText.classList.remove('boxHi');
                renameButton.classList.remove('buttonHi');
            }
        }
    });


    //検索ボックス
    searchTextbox.addEventListener('input',function(event){

        //ボタンリセット
        for(let element of Array.from(document.getElementsByClassName('searchresultButton'))){
            element.remove();
        }

        //idボックスを参照
        for(let element of Array.from(idArray)){
            try{
                if(((mainData[element].memo).indexOf(searchTextbox.value) != -1) && (mainData[element].type=="ファイル")){

                    //親div
                    const div = document.createElement('div');
                    div.classList.add('searchresultButton');
                    div.addEventListener('click',function(event){
                        //操作中要素に設定
                        currentElementID=element;
                        currentFileID=element;
                        //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                        memoTexrarea.value=mainData[currentFileID].memo;
                        fileNameText.value=mainData[currentFileID].name;
                        updateLabel.textContent=mainData[currentFileID].updateAt;
                        pathLabel.textContent=mainData[currentFileID].path;
                        //選択用クラス除去
                        for(let element of Array.from(document.getElementsByClassName('openFile'))){
                            element.classList.remove('openFile');
                        }
                        //選択用クラス自分に付与
                        document.getElementById(element).classList.add('openFile');
                        //親フォルダにクラス付与
                        document.getElementById(mainData[element].parentID).classList.add('openFile');

                        //ボタンリセット
                        for(let element of Array.from(document.getElementsByClassName('searchresultButton'))){
                            element.remove();
                        }
                        //ボックスクリア
                        searchTextbox.value="";
                    })
                    div.addEventListener('mouseenter',function(event){
                        div.style.backgroundColor="#394f57";
                        //操作中要素に設定
                        currentElementID=element;
                        currentFileID=element;
                        //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                        memoTexrarea.value=mainData[currentFileID].memo;
                        fileNameText.value=mainData[currentFileID].name;
                        updateLabel.textContent=mainData[currentFileID].updateAt;
                        pathLabel.textContent=mainData[currentFileID].path;
                        //選択用クラス除去
                        for(let element of Array.from(document.getElementsByClassName('openFile'))){
                            element.classList.remove('openFile');
                        }
                        //選択用クラス自分に付与
                        document.getElementById(element).classList.add('openFile');
                        //親フォルダにクラス付与
                        document.getElementById(mainData[element].parentID).classList.add('openFile');
                        // //ハイライトjs
                        // heighligthArea.textContent=memoTexrarea.value;
                        // hljs.highlightElement(heighligthArea);
                        // heighlightParent.hidden=false;
                        // //スタイル
                        // pathLabel.classList.add('pathHi');
                        // fileNameText.classList.add('boxHi');
                        // renameButton.classList.add('buttonHi');
                        //ハイライト非表示
                        heighlightParent.hidden=true;
                        pathLabel.classList.remove('pathHi');
                        fileNameText.classList.remove('boxHi');
                        renameButton.classList.remove('buttonHi');
                    })
                    div.addEventListener('mouseleave',function(event){
                        div.style.backgroundColor="transparent";
                    })
                    searchResultArea.appendChild(div);

                    //ボタン
                    const button = document.createElement('button');
                    button.textContent=`📄${mainData[element].name}`;
                    button.classList.add('searchresultButton');
                    button.classList.add('isFile');

                    //クリックイベント
                    button.addEventListener('click',function(event){
                        //操作中要素に設定
                        currentElementID=element;
                        currentFileID=element;
                        //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                        memoTexrarea.value=mainData[currentFileID].memo;
                        fileNameText.value=mainData[currentFileID].name;
                        updateLabel.textContent=mainData[currentFileID].updateAt;
                        pathLabel.textContent=mainData[currentFileID].path;
                        //選択用クラス除去
                        for(let element of Array.from(document.getElementsByClassName('openFile'))){
                            element.classList.remove('openFile');
                        }
                        //選択用クラス自分に付与
                        document.getElementById(element).classList.add('openFile');
                        //親フォルダにクラス付与
                        document.getElementById(mainData[element].parentID).classList.add('openFile');

                        //ボタンリセット
                        for(let element of Array.from(document.getElementsByClassName('searchresultButton'))){
                            element.remove();
                        }
                        //ボックスクリア
                        searchTextbox.value="";
                    })

                    button.addEventListener('mouseenter',function(event){
                        div.style.backgroundColor="#394f57";
                        //操作中要素に設定
                        currentElementID=element;
                        currentFileID=element;
                        //ドキュメントエリアに反映（ドキュメント、ファイル名、更新日、パス）
                        memoTexrarea.value=mainData[currentFileID].memo;
                        fileNameText.value=mainData[currentFileID].name;
                        updateLabel.textContent=mainData[currentFileID].updateAt;
                        pathLabel.textContent=mainData[currentFileID].path;
                        //選択用クラス除去
                        for(let element of Array.from(document.getElementsByClassName('openFile'))){
                            element.classList.remove('openFile');
                        }
                        //選択用クラス自分に付与
                        document.getElementById(element).classList.add('openFile');
                        //親フォルダにクラス付与
                        document.getElementById(mainData[element].parentID).classList.add('openFile');
                    })
                    button.addEventListener('mouseleave',function(event){
                        div.style.backgroundColor="transparent";
                    })

                    div.appendChild(button);

                    //パス
                    const path = document.createElement('label');
                    path.textContent=mainData[element].path;
                    path.classList.add('isPathLabel');
                    path.classList.add('searchresultButton');
                    path.classList.add('ml-2');
                    div.appendChild(path);

                }
            }catch(error){}
        }

        //空文字なら削除（全件ヒットしてしまうため）
        if(searchTextbox.value==""){
            //ボタン削除
            for(let element of Array.from(document.getElementsByClassName('searchresultButton'))){
                element.remove();
            }
        }
    })

    //データコピー
    document.addEventListener('keydown',function(event){
        if(event.ctrlKey && event.shiftKey && event.key==='D'){
            event.preventDefault();
            //文字列化したデータをコピー
            try{
                navigator.clipboard.writeText(JSON.stringify(mainData));
                alert("データコピー成功");
            }catch(error){
                alert("データコピー失敗");
            }
        }
    })

    // //データ読込み
    // var isDatabox=false;
    // document.addEventListener('keydown',function(event){
    //     if(event.ctrlKey && event.shiftKey && event.key==='R'){
    //         event.preventDefault();

    //         if(isDatabox)return;
    //         isDatabox=true;
    //         //入力ボックス（クリックで削除）
    //         const box = document.createElement("input");
    //         box.type="text";
    //         box.zIndex=1000;
    //         box.classList.add('dataBox');
    //         box.classList.add('textbox1');
    //         box.placeholder="データをペースト";
    //         document.body.appendChild(box);
    //         box.addEventListener('click',function(event){
    //             box.remove();
    //             isDatabox=false;
    //         })
    //         box.addEventListener('input',function(event){
    //             mainData=box.value;
    //             //savaStrage();
    //             roadStrage();
    //             constructAll();
    //             box.remove();
    //             isDatabox=false;
    //         })
    //         box.focus();
    //     }
    // })

    fileNameText.addEventListener('blur',function(event){
        try{
            //>使用不可
            if(fileNameText.value.indexOf(">") != -1){
                alert(" > は使用できません。");
                fileNameText.focus();
                fileNameText.value = "";
                return;
            }
            //tool or file
            if(document.getElementById(currentElementID).classList.contains('isFile')){
                //ファイル名変更
                try{
                    mainData[currentFileID].name=fileNameText.value;
                    document.getElementById(currentFileID).textContent=`📄${fileNameText.value}`;
                    //変更を保存
                    //savaStrage();
                }catch(error){}
            }
            if(document.getElementById(currentElementID).classList.contains('isTool')){
                //ツール名変更 --ok
                try{
                    mainData[currentToolID].name=fileNameText.value;
                    document.getElementById(currentToolID).textContent=`🛠️${fileNameText.value}`;
                    //変更を保存
                    //savaStrage();
                }
                catch(error){}
            }
        }catch(error){}
    });

}




// 共通部品*************************************************************************************************

//   対象から指定文字列の数をカウントして返す関数 --ok
function countTargetWord(target,word){
    var count=0;
    var start=0;
    while(true){
        if(target.indexOf(word,start) != -1){
            count++;
            start=target.indexOf(word,start)+word.length;
        }else{
            break;
        }
    }
    return count;
}

//　カンマ区切りの単語を配列に格納（return array）
function splitComma(text) {
    // カンマで分割して配列を作成
    let array = text.split(","); 
    return array;
}


//保存済みidを格納
function setSavedID(){
    //idArrayに保存データのidを格納
    const saveData = Object.values(mainData);
    for(let element of saveData){
        idArray.push(element.id);
    }
}

//７桁ID生成　重複ナシ
let idArray=[];
function randomID() {

    // 1000000 以上 9999999 以下の乱数を生成
    var id = Math.floor(1000000 + Math.random() * 9000000);

    if(idArray.join(",").indexOf(id,0) != -1){
        return randomID();
    }

    idArray.push(id);

    return id;
}

// let idSet = new Set();

// function randomID() {
//     // 1000000 以上 9999999 以下の乱数を生成
//     var id = Math.floor(1000000 + Math.random() * 9000000);

//     // 重複チェック
//     if (idSet.has(id)) {
//         return randomID();  // 重複があれば再帰的に呼び出し
//     }

//     idSet.add(id);  // 重複しない場合IDをセットに追加

//     return id;
// }

// 現在日付を返却　yyyy/mm/dd
function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear(); // 年を取得
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月を2桁に
    const day = String(today.getDate()).padStart(2, '0'); // 日を2桁に

    return `${year}/${month}/${day}`;
}



/*
2.21 monaco editor実装（バックアップ済み）
*/
// var monacoEditor = document.getElementById('monacoEditor');
// var monacoWin = document.getElementById('monacoWin');//ウィンドウ
// var language_lbl = document.getElementById('language_lbl');//言語ラベル


require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});
require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById("monacoEditor"), {
        value: `<!--bodyタグの中身を記述--!>
`,
        language: "html",
        theme: "vs-dark",
        extraEditorClassName: "custom-editor-style",
    });
    // 入力イベント
    editor.onDidChangeModelContent((event) => {

        //ドキュメント、更新日更新（表示：ドキュメント、ファイル名、更新日、パス）
        try{
            switch(langKbn){
                case 1 :{
                    mainData[currentToolID].html=editor.getValue();
                    break;
                }
                case 2 :{
                    mainData[currentToolID].css=editor.getValue();
                    break;
                }
                case 3 :{
                    mainData[currentToolID].js=editor.getValue();
                    break;
                }
            }
        }catch(error){}

        finally{
            mainData[currentToolID].updateAt=getCurrentDate();
            //savaStrage();
        }

//         //空白ならメモ復活 ※戻せなくなる
//         if(editor.getValue().trim() == ""){
//             if(langKbn == 1){
//                 editor.setValue(`<!--htmlタグの中身を記述--!>
// `);
//             }
//         }
    });
    
});


//言語切替ボタン
var langKbn = 1;//1:html 2:css 3:js
function changeLang(value){//"pre" or "next"
    switch(value){
        case "pre":{//前へ
            langKbn--;
            langKbn = langKbn==0 ? 3 : langKbn;
            break;
        }
        case "next":{//次へ
            langKbn++;
            langKbn = langKbn==4 ? 1 : langKbn;
            break;
        }
    }

    switch(langKbn){
        case 1:{//html
            language_lbl.textContent = "html";
            // language_lbl.style.color = "orange";
            monacoChange("html");
            window.editor.setValue(mainData[currentToolID].html);
            break;
        }
        case 2:{//css
            language_lbl.textContent = "css";
            // language_lbl.style.color = "aqua";
            monacoChange("css");
            window.editor.setValue(mainData[currentToolID].css);
            break;
        }
        case 3:{//js
            language_lbl.textContent = "js";
            // language_lbl.style.color = "yellow";
            monacoChange("javascript");
            window.editor.setValue(mainData[currentToolID].js);
            break;
        }
    }
    setExTag();
    window.editor.focus();
}


//モナコ言語切替
function monacoChange(lang) {
    if (editor.getModel()) {
        monaco.editor.setModelLanguage(editor.getModel(), lang);
    }
}

//電源
var powerFlg = false;

//電源ボタン
function setPower(){
    switch(powerFlg){

        case true:{  //  →off
            powerFlg = false;
            powerButton.classList.remove('powerOn');
            exeTool("off");
            break;
        }
        case false:{  //  →on
            powerFlg = true;
            powerButton.classList.add('powerOn');
            exeTool("on");
            break;
        }
    }
}


//ツールのソース
var toolsrc = "";

//ツール実行
function exeTool(kbn){// on or off

    switch(kbn){
        case "on":{ // → on
            //iframe表示
            iframeContainer.hidden = false;
            setToolSrc();
            const doc = toolframe.contentWindow.document;
            doc.open();
            doc.write(toolsrc);
            doc.close();
            break;
        }
        case "off":{ // → off
            //iframe非表示
            iframeContainer.hidden = true;
            // const doc = toolframe.contentWindow.document;
            // doc.open();
            // doc.write("");
            // doc.close();
            break;
        }
    }
}

// //ツールソースをセット
// function setToolSrc(){
//     toolsrc = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset='UTF-8'>
//     <style>
//         ${mainData[currentToolID].css}
//     </style>
//     <script>
//         document.addEventListener('DOMContentLoaded', () => {
//             ${ mainData[currentToolID].js }
//         });
//     </script>
// </head>
// <body>
//     ${ mainData[currentToolID].html }
// </body>
// </html>
// `;
// }

//ツールソースをセット
function setToolSrc(){
    toolsrc = `
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
        }
        ${mainData[currentToolID].css}
    </style>
</head>
<body>
    ${mainData[currentToolID].html}
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            ${mainData[currentToolID].js}
        });
    </script>
</body>
</html>
`;

    //htmlのみで実行
    toolsrc = htmlOnlyCheck.checked ? mainData[currentToolID].html : toolsrc;
}



// 説明タグセット
function setExTag(){
    switch(langKbn){
        case 1:{
            exTag_s.textContent = `<body>`;
            exTag_e.textContent = `</body>`;
            exTag_s.style.color = "gray";
            exTag_e.style.color = "gray";
            break;
        }
        case 2:{
            exTag_s.textContent = `<style>`;
            exTag_e.textContent = `</style>`;
            exTag_s.style.color = "gray";
            exTag_e.style.color = "gray";
            break;
        }
        case 3:{
            exTag_s.textContent = `document.addEventListener('DOMContentLoaded', () => {`;
            exTag_e.textContent = `});`;
            exTag_s.style.color = "gray";
            exTag_e.style.color = "gray";
            break;
        }
    }
}



//htmlのみで実行
function htmlOnly(){
    switch(htmlOnlyCheck.checked){
        case true:{//チェックあり
            exTag_s.hidden=true;
            exTag_e.hidden=true;
            mainData[currentToolID].htmlOnly=true;
            break;
        }
        case false:{//チェックなし
            exTag_s.hidden=false;
            exTag_e.hidden=false;
            mainData[currentToolID].htmlOnly=false;
            break;
        }
    }
}

//yyyy-mm-dd-hh-mm-ss
function getCurrentDateTime() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // 月（0始まりなので+1）
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}_${mm}_${dd}_${hh}_${min}_${ss}`;
}

// JSONファイルのダウンロード
function downloadJSON() {
    console.log("mainData before download:", mainData); // デバッグ用
    if (!mainData || typeof mainData !== "object") {
        alert("エクスポートするデータがありません。");
        return;
    }

    const dataStr = JSON.stringify(mainData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `document_kun(${getCurrentDateTime()}).json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// JSONファイルドロップ → mainData に格納（イベントリスナー）
document.addEventListener('drop', function(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    // ファイルがJSON形式であるか確認
    if (!file || !file.name.endsWith('.json') || file.type !== "application/json") {
        alert("JSONファイルをドロップしてください。");
        return;
    }

    if(!confirm("全データが上書きされます。続行しますか？"))return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            mainData = JSON.parse(event.target.result);
            //savaStrage();
            // roadStrage();
            constructAll();
            setSavedID();
        } catch (error) {
            alert("JSONの解析に失敗しました。正しいフォーマットのファイルを使用してください。");
            console.error("JSON Parse Error:", error);
        }
    };
    reader.readAsText(file);
    // window.location.reload();
});

//終了時に確認
window.addEventListener('beforeunload', function(event) {
    event.preventDefault(); // デフォルト動作を防ぐ（必須）
    event.returnValue = ""; // これを設定しないと動かない（固定メッセージ）
});

//ctrl + sでダウンロード
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        downloadJSON();
    }
});



//Excel追加（3.10）
excelArea = document.getElementById('excelArea');
excelHeader = document.getElementById('excelHeader');
excelBody = document.getElementById('excelBody');

//アクティブセル
var currentCell;//dom

//アルファベットリスト200（A～…AABなど）
const alphaList = [
    "A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z",
    "AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ",
    "AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT",
    "AU","AV","AW","AX","AY","AZ",
    "BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ",
    "BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT",
    "BU","BV","BW","BX","BY","BZ",
    "CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ",
    "CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT",
    "CU","CV","CW","CX","CY","CZ",
    "DA","DB","DC","DD","DE","DF","DG","DH","DI","DJ",
    "DK","DL","DM","DN","DO","DP","DQ","DR","DS","DT",
    "DU","DV","DW","DX","DY","DZ",
    "EA","EB","EC","ED","EE","EF","EG","EH","EI","EJ",
    "EK","EL","EM","EN","EO","EP","EQ","ER","ES","ET",
    "EU","EV","EW","EX","EY","EZ",
    "FA","FB","FC","FD","FE","FF","FG","FH","FI","FJ",
    "FK","FL","FM","FN","FO","FP","FQ","FR","FS","FT",
    "FU","FV","FW","FX","FY","FZ",
    "GA","GB","GC","GD","GE","GF","GG","GH","GI","GJ",
    "GK","GL","GM","GN","GO","GP","GQ","GR","GS","GT",
    "GU","GV","GW","GX","GY","GZ"
];

//初期実行
createExcelSheet();

//シート作成
function createExcelSheet(){

    for(let i = 0; i < 200; i++){

        const tr = document.createElement('tr');
        excelHeader.appendChild(tr);

        switch(i){
            case 0: { //１行目（ヘッダー行作成（アルファベット横列）ABCDEF...）
                for(let j = 0; j < 200; j++){
                    const td = document.createElement('td');
                    tr.appendChild(td);
                    const div = document.createElement('div');
                    div.classList.add('excelHeader');
                    div.textContent=j == 0 ? "　" : alphaList[j-1];
                    // ヘッダー横列固定
                    if (i == 0) {
                        td.style.position = "sticky";
                        td.style.top = "0";
                        td.style.zIndex = "10";
                    }

                    // ヘッダー縦列固定
                    if (j == 0) {
                        td.style.position = "sticky";
                        td.style.left = "0";
                        td.style.zIndex = "20";
                    }
                    td.appendChild(div);
                }
                break;
            }
            default: { //２行目以降（データ行作成）
                for(let j = 0; j < 200; j++){

                    // 1,2,3,4,5...
                    if (j == 0) {

                        const td = document.createElement('td');
                        tr.appendChild(td);
                        const div = document.createElement('div');
                        div.classList.add('excelNum');
                        div.textContent= i;
    
                        // 行番号固定
                        td.style.position = "sticky";
                        td.style.left = "0";
                        td.style.zIndex = "15";
                        td.style.backgroundColor = "#f4f4f4";
    
                        td.appendChild(div);
                        
                    //セル
                    }else{

                        const td = document.createElement('td');
                        tr.appendChild(td);
                        const cell = document.createElement('div');
                        cell.classList.add('cell');
                        cell.textContent= "　";
                        cell.contentEditable=true;
                        cell.spellcheck=false;
                        cell.id = `${alphaList[j-1]}-${i}`;//A-1,B-1,C-1...
                        td.appendChild(cell);

                        // イベント
                        cell.addEventListener('click', function(event){
                            cellClick(cell);
                        })
                        cell.addEventListener('input', function(event){
                            cellInput(cell);
                        })
                        // cell.addEventListener('blur', function(event){
                        //     currentCell = null;
                        // })
                    }
                }
                break;
            }
        }
        
    }
}

//セルデータ作成
function createExcelData(idParam){
    for(let i = 1; i < 200; i++){
        for(let j = 1; j < 200; j++){
            mainData[idParam]["cellData"][`${alphaList[j-1]}-${i}`]={
                id: `${alphaList[j-1]}-${i}`,
                value: "",
                bold: false,//太字 no
                italic: false,//斜体 no
                underline: false,//下線 no
                BGcolor: "#d8d8d8",//背景色　※デフォルト
                fontColor: "black",//文字色 no
            };
        }
    }
    //savaStrage();
}

//データ反映
function reflectExcelData(){
    for(let i = 1; i < 200; i++){
        for(let j = 1; j < 200; j++){

            const cell = document.getElementById(`${alphaList[j-1]}-${i}`);

            cell.textContent = mainData[currentExcelID]["cellData"][`${alphaList[j-1]}-${i}`].value;
            cell.style.fontWeight = mainData[currentExcelID]["cellData"][`${alphaList[j-1]}-${i}`].bold ? "bold" : "normal";
            cell.style.fontStyle = mainData[currentExcelID]["cellData"][`${alphaList[j-1]}-${i}`].italic ? "italic" : "normal";
            cell.style.textDecoration = mainData[currentExcelID]["cellData"][`${alphaList[j-1]}-${i}`].underline ? "underline" : "none";
            cell.style.backgroundColor = mainData[currentExcelID]["cellData"][`${alphaList[j-1]}-${i}`].BGcolor;
            cell.style.color = mainData[currentExcelID]["cellData"][`${alphaList[j-1]}-${i}`].fontColor;
            
        }
    }
    //savaStrage();
}

//クリックイベント
function cellClick(cell){//dom
    currentCell= cell;
    //入力テキストの末尾にカーソルを移動
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(cell);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    cell.focus();
}

//カラーパレット
function setBG(color){
    currentCell.style.backgroundColor = color;
    mainData[currentExcelID]["cellData"][currentCell.id].BGcolor=color;
}

//文字色
function setFontColor(color){
    currentCell.style.color = color;
    mainData[currentExcelID]["cellData"][currentCell.id].fontColor=color;
}

// shift矢印キー、Enterでセル移動
document.addEventListener('keydown', function(event) {
    if (editingExcel) {

        switch (event.key) {
            case "ArrowUp"://-1
                try{
                    document.getElementById(`${currentCell.id.split("-")[0]}-${Number(currentCell.id.split("-")[1])-1}`).focus();
                    currentCell = document.getElementById(`${currentCell.id.split("-")[0]}-${Number(currentCell.id.split("-")[1])-1}`);
                    //入力テキストの末尾にカーソルを移動
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(currentCell);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    currentCell.focus();
                }catch(error){}
                break;

            case "ArrowDown"://+1
                try{
                    document.getElementById(`${currentCell.id.split("-")[0]}-${Number(currentCell.id.split("-")[1])+1}`).focus();
                    currentCell = document.getElementById(`${currentCell.id.split("-")[0]}-${Number(currentCell.id.split("-")[1])+1}`);
                    //入力テキストの末尾にカーソルを移動
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(currentCell);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    currentCell.focus();
                }catch(error){}
                break;

            case "Enter"://+1
                try{
                    document.getElementById(`${currentCell.id.split("-")[0]}-${Number(currentCell.id.split("-")[1])+1}`).focus();
                    currentCell = document.getElementById(`${currentCell.id.split("-")[0]}-${Number(currentCell.id.split("-")[1])+1}`);
                    event.preventDefault();
                    //入力テキストの末尾にカーソルを移動
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(currentCell);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    currentCell.focus();
                }catch(error){}
                break;

            case "ArrowLeft"://-alpha
                try{
                    if(!event.shiftKey)return;
                    document.getElementById(`${alphaList[alphaList.indexOf(currentCell.id.split("-")[0])-1]}-${currentCell.id.split("-")[1]}`).focus();
                    currentCell = document.getElementById(`${alphaList[alphaList.indexOf(currentCell.id.split("-")[0])-1]}-${currentCell.id.split("-")[1]}`);
                    //入力テキストの末尾にカーソルを移動
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(currentCell);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    currentCell.focus();
                }catch(error){}
                break;

            case "ArrowRight"://+alpha
                try{
                    if(!event.shiftKey)return;
                    document.getElementById(`${alphaList[alphaList.indexOf(currentCell.id.split("-")[0])+1]}-${currentCell.id.split("-")[1]}`).focus();
                    currentCell = document.getElementById(`${alphaList[alphaList.indexOf(currentCell.id.split("-")[0])+1]}-${currentCell.id.split("-")[1]}`);
                    //入力テキストの末尾にカーソルを移動
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(currentCell);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    currentCell.focus();
                }catch(error){}
                break;
        }
        
    }
})

//入力イベント（json同期）
function cellInput(cell){
        mainData[currentExcelID]["cellData"][cell.id].value=cell.textContent;
        //savaStrage();
}

// 太字
document.addEventListener('keydown', function(event) {
    if (editingExcel) {
        if (event.ctrlKey && (event.key === "b" || event.key === "B")) {
            event.preventDefault();
            currentCell.style.fontWeight = currentCell.style.fontWeight === "bold" ? "normal" : "bold";
            mainData[currentExcelID]["cellData"][currentCell.id].bold = currentCell.style.fontWeight === "bold" ? true : false;
        }
    }
})

// 斜体
document.addEventListener('keydown', function(event) {
    if (editingExcel) {
        if (event.ctrlKey && (event.key === "i" || event.key === "I")) {
            event.preventDefault();
            currentCell.style.fontStyle = currentCell.style.fontStyle === "italic" ? "normal" : "italic";
            mainData[currentExcelID]["cellData"][currentCell.id].italic = currentCell.style.fontStyle === "italic" ? true : false;
        }
    }
})

// 下線
document.addEventListener('keydown', function(event) {
    if (editingExcel) {
        if (event.ctrlKey && (event.key === "u" || event.key === "U")) {
            event.preventDefault();
            currentCell.style.textDecoration = currentCell.style.textDecoration === "underline" ? "none" : "underline";
            mainData[currentExcelID]["cellData"][currentCell.id].underline = currentCell.style.textDecoration === "underline" ? true : false;
        }
    }
})