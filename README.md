# merge-smi-into-mkv

아래 일련의 작업들은 mkv 파일을 AppleTV 에서 재생시키기 위해 수행하다 나온 결과이다.  

* Mac -> Apple TV 로의 Airplay 는 mp4 파일밖에 되지 않는다.
* mkv -> mp4 로의 변환 과정이 너무 귀찮고 변환한다 해도 화질이 저하되는 현상이 나타났다.
* iPad / iPhone 에 영상을 넣어 Airplay 시키고자 했으나, mkv 는 Airplay 로 볼 수 없었다.
  * 단, nPlayer 를 이용하면 가능했으나, 자막의 싱크 조절이 Airplay 를 통해 나오는 영상엔 제대로 적용되지 않았다.
  * iPad / iPhone 에 넣는 귀찮음 또한 있다.
* Mac -> Apple TV 로 Airplay 가 되지 않는다면, Apple TV 에서 Mac 의 영상을 가져다 보여주는 방법을 찾기로 했다.
* Apple TV 에 VLC 를 설치, VLC 의 로컬네트워크 기능을 이용해 보기로 했다.
  * VLC 의 로컬네트워크 에 Mac 의 공유폴더를 보이게 하기 위해선 Mac 에서 아래의 설정을 해주어야 한다.
    * 시스템 환경설정 -> 공유 -> 파일 공유 체크
    * 공유 할 공유폴더 지정
    * 사용자의 권한 설정
    * 옵션 을 눌러 Windows 파일 공유 대상에 사용자 체크
  * 위와 같이 설정하면 Apple TV 의 로컬네트워크 에 내 Mac 이 SMB 공유로 보여지며, 내 계정의 ID / PW 를 입력하여 공유폴더에 접근할 수 있다.
  * 이 방법의 단점은, Mac 이 잠자기모드로 들어간 경우 파일 공유가 중단된다는 것이다.
    * 이는 시스템 환경설정 -> 에너지 절약 에서 `가능하다면 하드 디스크를 잠자기 상태로 두기` 항목 체크 해제하면 해결될 수 있는 문제가 아닐까 기대한다.
* VLC 를 통해 영상을 띄우는데엔 성공했지만, smi 파일 혹은 srt 파일이 같은 이름으로 폴더에 있다 하더라도 VLC 에서 해당 자막을 불러오지 못하는 일이 일어났다.
* 이 때문에 smi -> srt 변환 후 해당 자막파일을 mkv 에 attach 하는 작업이 필요했다.
* smi -> srt 변환은 아래의 사이트를 통해 수행하였다.
  * https://subtitletools.com/convert-to-srt
    * zip 으로 묶으면 최대 100개 까지 동시에 변환할 수 있다.
  * [극내 사이트 링크](http://smisrt.com/) 에서도 수행할 수 있었지만, 이 링크는 한번에 1개의 파일밖에 되지 않는다.
  * 변환 이후 더 찾아보니 command line 을 이용해 변환 가능한 툴이 있는 것을 확인했다.
    * [방법1](https://github.com/ewoo/smi-to-srt)
    * [방법2](https://superuser.com/questions/117929/open-source-command-line-subtitle-converter)
* srt 자막 파일을 mkv 에 attach 하는 툴은 mkvmerge 를 이용해야 한다.
  * `brew install --with-qt5 mkvtoolnix`
  * 설치 완료 후 `mkvtoolnix-gui` 를 이용하면 gui 툴로도 작업할 수 있다.
  * Sample command : `mkvmerge -o ../SlamDunk/SlamDunk001.mkv Slam\ Dunk.1993.EP001.x264.AC3-CalChi.mkv --language 0:kor Slam\ Dunk.1993.EP001.x264.AC3-CalChi.srt`
* 일단 내가 필요한 만큼의 작업은 [링크](https://github.com/kanziw/merge-smi-into-mkv/blob/c2a1b2c397e20beebb2961286d006f1091a69d8c/index.js)의 코드로도 충분하기 때문에 더이상의 폴리싱은 하지 않았다.
* 나중에 필요하면 아래의 내용이 더 추가되면 좋겠다.
  1. smi -> srt 변환을 command line 으로 수행
  2. input directory 를 받아 output directory 에 결과물을 저장하는 기능
    * 매칭되는 mkv - smi 파일이 모두 존재하는지 check 필요
    * merge 하는 subtitle 의 정보를 입력 받아 이미 해당 언어로 subtitle 이 있으면 skip
    * 이미 subtitle 이 존재하는 mkv 파일이면 그 다음번 번호로 subtitle 추가
    * 원본 파일을 지울 것인지 여부를 확인

