# Description
게시판 작성/수정/삭제 , 댓글 작성, 대댓글 작성 기능의 API를 제공하는 서버입니다. </br>
.env 파일은 git에 올리지 않는 것이 원칙이나 테스트를 위해 편의상 공유합니다. </br>
아래 내용은 OS가 Windows 기준으로 작성되었습니다.

# 개요
- [MySQL 설치](#MySQL-설치)
- [node_modules 설치](#node_modules-설치)

## MySQL 설치
[MySQL 다운로드](https://dev.mysql.com/downloads/windows/installer/8.0.html)를 클릭하여 OS에 맞는 버전을 설치합니다. (2022-08-11 기준 MySQL 사이트가 불안정한 것 같다.)

설치 시 Configuration 메뉴에서 "root" 유저의 비밀번호를 입력합니다. </br>
<span style="color:red">
  root 유저의 비밀번호를 잊지 않도록 관리합니다.
</span>

![mysql_root](https://user-images.githubusercontent.com/45446457/184075491-9e9f8961-55cf-45f5-910d-81e2d50d0b84.png)

</br>

데이터베이스 생성
```
CREATE DATABASE `wantedlab` 
```

## node_modules 설치


