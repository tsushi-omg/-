
// 初期実行
document.addEventListener('DOMContentLoaded',()=>{
    hensu();
    roadStrage();
    setSavedID();
    startEventListen();
    constructAll();

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


}

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
    createFolderFunction(folderDirectory,newFolderTextbox,newFolderTextbox.value,"","folder","","","",true,false,"","");
}

// フォルダ作成📁*************************************************************************************************
function createFolderFunction(parentDiv,nameTextbox,value,path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,constructorID,constructorName){

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
                    savaStrage();//--ok!
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
                    childTextbox.placeholder="新規フォルダ／ファイル名";
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
                        createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"folder",emptyLabel,folder,idParam,false,false,"","");
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
                        createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"file",emptyLabel,folder,idParam,false,false,"","");
                    })
                    div2.appendChild(newFileButtonChild);

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
                    // state:"close",　手動で開くのは楽だしこれは要らない。このために割く時間！
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
                    createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"folder",emptyLabel,folder,idParam,false,true,folderArray[i].id,folderArray[i].name);
                }
                const fileArray = Object.values(mainData).filter(item => (item.parentID == constructorID) && (item.type=="ファイル"));
                for(let i = 0; i < fileArray.length; i++){
                    createFolderFunction(div3,childTextbox,childTextbox.value,currentPath,"file",emptyLabel,folder,idParam,false,true,fileArray[i].id,fileArray[i].name);
                }
            }

            if(isConstruct && !isTop){
                div.hidden=true;
            }

            //変更を保存
            savaStrage();

            //フォルダ名ボックスクリア
            nameTextbox.value="";

            //フォーカス
            nameTextbox.focus();

            break;
        }

        case "file":{//************************************************************************************************************ */
        
            var fileName = value;
            if(isConstruct)fileName=constructorName;

            if(!isConstruct){
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
                    createFolderFunction(parentDiv,nameTextbox,array[i],path,type,emptyLabelParam,parentFolder,parentIDPath,isTop,isConstruct,"","");
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
                    //操作中要素に設定
                    currentElementID=file.id;
                    currentFileID=file.id;
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
                    savaStrage();//--ok!
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
            savaStrage();
    
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

var currentParentFolderID;//子要素作成ボタン押下時に親フォルダを参照する


//ローカルストレージ*****************************************************************
//保存
function savaStrage(){
    localStorage.setItem("mainData",JSON.stringify(mainData));
    dataryoiki.value=mainData;
}

//読込
function roadStrage(){
    const storedData = localStorage.getItem("mainData");
    if (storedData) {
      mainData = JSON.parse(storedData);
    }
}



// データを基に画面構築***********************************************************************
function constructAll(){
    //先頭フォルダを取得（構築）
    let topFolderArray = Object.values(mainData).filter(item => (item.top===true) && (item.type!="deleted"));
    for(let i = 0; i < topFolderArray.length; i++){//先頭フォルダの数だけ繰り返し
        //固有の先頭フォルダ
        const topFolder = topFolderArray[i];
        createFolderFunction(folderDirectory,newFolderTextbox,topFolder.name,"","folder","","","",true,true,topFolder.id,topFolder.name);//idと表示名は必須
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




// イベントリスナー(dom読込後に開始)*****************************************************************************
function startEventListen(){
    memoTexrarea.addEventListener('input',function(event){
        //ドキュメント、更新日更新（表示：ドキュメント、ファイル名、更新日、パス）
        mainData[currentFileID].memo=memoTexrarea.value;
        mainData[currentFileID].updateAt=getCurrentDate();
        //変更を保存
        savaStrage();
    })

    // dataryoiki.addEventListener('input',function(event){
    //     savaStrage();
    // })

    //クリップボードにコピー -----
    document.addEventListener('keydown',function(event){
        if(event.ctrlKey && event.key===';'){
            //デフォルト処理無効化
            event.preventDefault();

            //クリップボードにコピー
            // navigator.clipboard.writeText('------------------------------------------------------------------------------------------------------------------------------------------------------');
            //挿入
            // カーソル位置を取得
            var cursorS = memoTexrarea.selectionStart;
            var cursorE = memoTexrarea.selectionEnd;
            
            var newText = `${memoTexrarea.value.substring(0,cursorS)}------------------------------------------------------------------------------------------------------------------------------------------------------${memoTexrarea.value.substring(cursorE)}`;
            memoTexrarea.value=newText;
        }
    })

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
