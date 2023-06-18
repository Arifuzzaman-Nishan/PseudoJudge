#include<iostream>
#include<algorithm>
#include<iomanip>
#include<vector>
#include<queue>
#include<cstring>
#include<cstdlib>
#include<cmath>
#include<map>
#include<set>
#define ll long long
#define sc scanf
#define pf printf
#define Pi 2*acos(0.0)
#define M 10000007


using namespace std;

int LCS(string s1,string s2,int len1,int len2 )
 {
 	 /* Following steps build L[m+1][n+1] in bottom up fashion. Note 
      that L[i][j] contains length of LCS of X[0..i-1] and Y[0..j-1] */
 	int i,j;
 	int lcs[len1+1][len2+1];
 	for(i=0;i<=len1;i++)
 	for(j=0;j<=len2;j++)
 	{
 		if(i==0 || j==0) {
 			lcs[i][j]=0;
 			  
		 }
 		else if(s1[i-1]==s2[j-1]) lcs[i][j]=lcs[i-1][j-1]+1;
 		else lcs[i][j]=max(lcs[i-1][j],lcs[i][j-1]);
	 }
	 return lcs[len1][len2];/* L[m][n] contains length of LCS for X[0..n-1] and Y[0..m-1] */
 }
 
  int max(int a, int b)
{
    return (a > b)? a : b;
}

int main() {
 
	string str,s;
	 while(getline(cin,str)){
	 	 
	 getline(cin,s);
	int l=str.size();
	int k=s.size();
	cout<<LCS(str,s,l,k)<<endl;
	 }
	
	
    return 0;
}