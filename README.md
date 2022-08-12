# Description
  게시판 작성/수정/삭제 , 댓글 작성, 대댓글 작성 기능의 API를 제공하는 서버입니다. </br>
  .env 파일은 git에 올리지 않는 것이 원칙이나 테스트를 위해 편의상 공유합니다. </br>
  아래 내용은 Windows OS 기준으로 작성되었습니다.

# 개요
- [MySQL 설치](#MySQL-설치)
- [데이터베이스 설정 및 구성](#데이터베이스-설정-및-구성)
- [node_modules 설치](#node_modules-설치)

## MySQL 설치
[MySQL 다운로드](https://dev.mysql.com/downloads/windows/installer/8.0.html)를 클릭하여 OS에 맞는 버전을 설치합니다. (2022-08-11 기준 MySQL 사이트가 불안정한 것 같다.)

**1. MySQL Port는 기본 Port인 3306으로 진행합니다.**
![mysql_install_1](https://user-images.githubusercontent.com/45446457/184093220-a998ab41-db42-4e8f-bc48-0825827dd5db.JPG)

</br>

**2. 설치 시 Configuration 메뉴에서 "root" 유저의 비밀번호를 입력합니다. (예제 비밀번호 : 1234)** </br>
![mysql_install_2](https://user-images.githubusercontent.com/45446457/184093920-0c16d1e9-f526-42cc-b00a-01ec3aa62b9c.JPG)

</br>

## 데이터베이스 설정 및 구성

>**1. PowerShell 를 이용하여 환경변수 설정 (MySQL 설치 경로 확인)**
> ```
>  SETX PATH "C:\Program Files\MySQL\MySQL Server 8.0\bin;%PATH"
>  ```
>![mysql_install_3](https://user-images.githubusercontent.com/45446457/184096823-20be62cb-b308-47c5-b0da-57fde6ff1e76.JPG)

</br>

>**2. Command 창에서 MySQL 접속 (root 비밀번호 입력)**
>```
>mysql -u root -p
>```
>![mysql_install_4](https://user-images.githubusercontent.com/45446457/184099453-fffcd750-95de-4162-a563-1cfcaa7dce38.JPG)

</br>

>**3. 데이터베이스 생성 후 선택**
>```
>CREATE DATABASE wantedlab;
>```
>![mysql_install_5](https://user-images.githubusercontent.com/45446457/184100333-effe3576-88c6-4f4d-ba66-11ce947390cc.JPG)
>```
>USE wantedlab;
>```
>![mysql_install_6](https://user-images.githubusercontent.com/45446457/184100998-e2c5914f-a779-41f2-a17c-9ba339d8493b.JPG)


</br>

>**4. 게시물 테이블 생성**
>```
>CREATE TABLE board(
>  no int Auto_Increment COMMENT '고유 번호', 
>  title varchar(100) not null COMMENT '제목',	
>  contents text not null COMMENT '내용',
>  author varchar(10) not null COMMENT '작성자', 
>  password varchar(128) not null COMMENT '비밀번호',
>  createdAt datetime not null COMMENT '생성 일시',
>  modifiedAt datetime COMMENT '수정 일시',
>  PRIMARY KEY (no)
>)COMMENT '게시물 정보';
>```
>![mysql_install_7](https://user-images.githubusercontent.com/45446457/184101996-6a8ab1b1-040c-4448-90a0-b2ee1c09c2bd.JPG)

</br>

>**5. 댓글 테이블 생성**
>```
>CREATE TABLE comments(
>  no int primary key Auto_Increment COMMENT '고유 번호', 
>  board_no int  not null COMMENT '게시물 번호',
>  contents text not null COMMENT '내용', 
>  author varchar(10) not null COMMENT '작성자',
>  createdAt datetime not null COMMENT '생성 일시',
>  FOREIGN KEY(board_no)
>  REFERENCES board(no) ON DELETE CASCADE ON UPDATE CASCADE
>)COMMENT '댓글 정보';
>```
>![mysql_install_8](https://user-images.githubusercontent.com/45446457/184102709-7691fc50-4caa-4f9c-985d-3c46bf059b60.JPG)

</br>

>**5. 대댓글 테이블 생성**
>```
>CREATE TALBE reply(
>  no int primary key Auto_Increment COMMENT '고유 번호', 
>  comments_no int  not null COMMENT '댓글 번호', 
>  contents text not null COMMENT '내용', 
>  author varchar(10) not null COMMENT '작성자',
>  createdAt datetime not null COMMENT '생성 일시',
>  FOREIGN KEY(comments_no)
>  REFERENCES comments(no) ON DELETE CASCADE ON UPDATE CASCADE
>)COMMENT '대댓글 정보';
>```
>![mysql_install_9](https://user-images.githubusercontent.com/45446457/184273587-5e776726-b6e3-4f9f-bedf-be2f17584362.JPG)

</br>

>**5. 키워드 테이블 생성**
>```
>CREATE TABLE keyword(
>	no int primary key Auto_Increment COMMENT '고유 번호',
>	author varchar(10) not null COMMENT '작성자',
>	keyword varchar(100) not null COMMENT '키워드'
>)COMMENT '키워드 정보';
>```
>![mysql_install_10](https://user-images.githubusercontent.com/45446457/184274066-e85af0dc-29b3-4509-9aff-5728301917cf.JPG)


## node_modules 설치


