#!/bin/sh
set -e

# 항상 현재 레포(root) 기준에서 실행된다고 가정
rm -rf output
mkdir -p output

# StudyApp으로 보내고 싶은 파일들을 output에 복사
# 필요에 따라 골라서 넣어도 되고, 일단 전체 복사를 예시로 보여줄게
cp -R ./* output/

# 자기 자신이나 불필요한 것들 제거 (원하면 조정)
rm -rf output/output
rm -rf output/.git
