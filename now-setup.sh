echo "cleaning possible tmp"
rm -rf tmp
temp=$(mktemp -dt "$0")
echo "copy into os $temp"
cp -r ./ $temp
echo "making ./tmp"
rm -rf tmp
mkdir tmp
echo "copy into ./tmp"
cp -r $temp/ tmp
mkdir tmp
echo "cleaning $temp"
rm -rf $temp
